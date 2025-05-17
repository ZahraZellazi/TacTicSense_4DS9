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

    # Manually initialize and fit LabelEncoders with known values
    position_encoder = LabelEncoder()
    tier_encoder = LabelEncoder()

    # These must match the encoding used during model training
    position_encoder.classes_ = np.array(["Goalkeeper", "Defender", "Midfielder", "Forward"])
    tier_encoder.classes_ = np.array(["Top", "Mid", "Low"])

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

        # Validate required fields
        required_fields = ['age', 'position', 'overall_rating', 'club_tier']
        missing = [field for field in required_fields if field not in data or data[field] in [None, '']]
        if missing:
            return jsonify({
                'status': 'error',
                'missing_fields': missing,
                'message': 'All required fields must be provided'
            }), 400

        # Create DataFrame
        df = pd.DataFrame([{
            'age': int(data['age']),
            'position': data['position'],
            'overall_rating': float(data['overall_rating']),
            'club_tier': data['club_tier']
        }])

        # Encode categorical variables
        try:
            df['position'] = position_encoder.transform(df['position'])
            df['club_tier'] = tier_encoder.transform(df['club_tier'])
        except ValueError as enc_err:
            return jsonify({
                'status': 'error',
                'message': f'Invalid value in categorical fields: {enc_err}'
            }), 400

        # Ensure correct feature order
        features = ['age', 'position', 'overall_rating', 'club_tier']
        if not all(f in df.columns for f in features):
            raise ValueError("Missing features for prediction")

        # Predict
        prediction = model.predict(df[features])
        market_value = max(100000, round(float(prediction[0])))

        return jsonify({
            'status': 'success',
            'predicted_market_value': market_value,
            'currency': 'EUR'
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
