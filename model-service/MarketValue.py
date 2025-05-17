from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
from sklearn.preprocessing import LabelEncoder
import traceback
import numpy as np

app = Flask(__name__)
CORS(app)

# Initialize model and encoders
try:
    print("Loading model and encoders...")

    # Load the model
    model = joblib.load('VotingEnsemble_model.pkl')

    # Initialize all required encoders
    position_encoder = LabelEncoder()
    tier_encoder = LabelEncoder()
    play_styles_encoder = LabelEncoder()
    att_position_encoder = LabelEncoder()
    team_contract_encoder = LabelEncoder()

    # Set the known classes for each encoder (must match training data)
    position_encoder.classes_ = np.array(["Goalkeeper", "Defender", "Midfielder", "Forward"])
    tier_encoder.classes_ = np.array(["Top", "Mid", "Low"])
    play_styles_encoder.classes_ = np.array(["Technical", "Physical", "Balanced", "Unknown"])
    att_position_encoder.classes_ = np.array(["Center", "Wide", "Free Role", "Unknown"])
    team_contract_encoder.classes_ = np.array(["1 year", "2 years", "3 years", "4+ years", "Unknown"])

    print("Model and encoders loaded successfully!")

except Exception as e:
    print(f"Error loading model or encoders: {e}")
    traceback.print_exc()
    raise

@app.route('/')
def home():
    return "Market Value Prediction Server Running"

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'}), 200

@app.route('/predict_market_value', methods=['POST'])
def predict_market_value():
    try:
        if not request.is_json:
            return jsonify({
                'status': 'error',
                'error': 'Invalid format',
                'message': 'Request must be in JSON format'
            }), 400

        data = request.get_json()
        print("Received data:", data)

        # Define all required fields with their expected types
        required_fields = {
            'age': int,
            'position': str,
            'overall_rating': float,
            'club_tier': str,
            'potential': float,
            'reactions': float,
            'composure': float,
            'total_defending': float,
            'play_styles': str,
            'years_since_joined': int,
            'best_overall': float,
            'wage': float,
            'team_contract': str,
            'growth': float,
            'att_position': str
        }

        # Validate all fields exist and have proper types
        errors = []
        processed_data = {}
        
        for field, field_type in required_fields.items():
            if field not in data or data[field] is None:
                errors.append(f"Missing required field: {field}")
                continue
            
            try:
                # Convert to correct type
                processed_data[field] = field_type(data[field])
            except (ValueError, TypeError):
                errors.append(f"Invalid type for {field}, expected {field_type.__name__}")

        if errors:
            return jsonify({
                'status': 'error',
                'errors': errors,
                'message': 'Invalid input data'
            }), 400

        # Create DataFrame with all required features
        df = pd.DataFrame([processed_data])

        # Encode categorical variables
        try:
            df['position'] = position_encoder.transform(df['position'])
            df['club_tier'] = tier_encoder.transform(df['club_tier'])
            df['play_styles'] = play_styles_encoder.transform(df['play_styles'])
            df['team_contract'] = team_contract_encoder.transform(df['team_contract'])
            df['att_position'] = att_position_encoder.transform(df['att_position'])
        except ValueError as enc_err:
            return jsonify({
                'status': 'error',
                'message': 'Invalid categorical value',
                'details': str(enc_err),
                'valid_positions': position_encoder.classes_.tolist(),
                'valid_tiers': tier_encoder.classes_.tolist(),
                'valid_play_styles': play_styles_encoder.classes_.tolist(),
                'valid_team_contracts': team_contract_encoder.classes_.tolist(),
                'valid_att_positions': att_position_encoder.classes_.tolist()
            }), 400

        # Ensure correct feature order (must match training data exactly)
        features = [
            'age', 'position', 'overall_rating', 'club_tier',
            'potential', 'reactions', 'composure', 'total_defending',
            'play_styles', 'years_since_joined', 'best_overall',
            'wage', 'team_contract', 'growth', 'att_position'
        ]

        # Predict
        prediction = model.predict(df[features])
        market_value = max(100000, round(float(prediction[0])))  # Minimum €100,000

        return jsonify({
            'status': 'success',
            'predicted_market_value': market_value,
            'currency': 'EUR',
            'input_features': processed_data
        })

    except Exception as e:
        traceback.print_exc()
        return jsonify({
            'status': 'error',
            'error': str(e),
            'message': 'Prediction failed'
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True)