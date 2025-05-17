from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

# Load your SVR model
try:
    model = joblib.load('Support_Vector_Regressor.pkl')
    print("Support Vector Regressor model loaded successfully.")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

@app.route('/predict', methods=['POST'])
def predict():
    if not model:
        return jsonify({'status': 'error', 'message': 'Model not loaded'}), 500

    try:
        data = request.get_json()

        required_fields = [
            'Age',
            'Potential',
            'Physical_Positioning',
            'Number_of_playstyles',
            'Composure',
            'Strength',
            'Reactions',
            'Overall_rating'
        ]

        for field in required_fields:
            if field not in data:
                return jsonify({'status': 'error', 'message': f'Missing field: {field}'}), 400

        # Extract raw inputs
        raw_features = np.array([
            float(data['Age']),
            float(data['Potential']),
            float(data['Physical_Positioning']),
            float(data['Number_of_playstyles']),
            float(data['Composure']),
            float(data['Strength']),
            float(data['Reactions']),
            float(data['Overall_rating']),
        ])

        # Manually apply MinMax scaling using your training min and max
        input_min = np.array([16, 50, 40, 1, 30, 40, 30, 50])
        input_max = np.array([40, 90, 90, 5, 90, 100, 90, 90])

        features_norm = (raw_features - input_min) / (input_max - input_min)

        features_norm = features_norm.reshape(1, -1)

        prediction_norm = model.predict(features_norm)[0]

        # Inverse scale prediction
        target_min = 0
        target_max = 100
        predicted_original = prediction_norm * (target_max - target_min) + target_min

        return jsonify({
            'status': 'success',
            'predicted_growth': round(float(predicted_original), 2)
        })

    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 400


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True)
