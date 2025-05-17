from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import numpy as np
from sklearn.preprocessing import LabelEncoder

app = Flask(__name__)
CORS(app)

# Initialize and fit encoders
injury_types = [
    "Knee injury", "Hamstring strain", "Shoulder injury",
    "Groin injury", "Calf injury", "Ankle injury",
    "Cruciate ligament tear", "Groin problems", "Hip injury",
    "Hand injury", "Hamstring injury", "Bruised ribs", "Knock",
    "Muscle injury", "Muscle fatigue", "Foot injury", "Virus",
    "Coronavirus", "Inner ligament injury", "Knee problems", "Ill",
    "Calf problems", "Ill & knock", "Metatarsal fracture",
    "Concussion", "Outer ligament problems", "Thigh problems",
    "Unknown injury", "Groin surgery", "Achilles tendon problems"
]

injury_encoder = LabelEncoder()
injury_encoder.fit(injury_types)

result_encoder = LabelEncoder()
result_encoder.fit(["Win", "Draw", "Loss"])

# Load model
try:
    model = joblib.load('voting_classifier.pkl')
    print("Model loaded successfully")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

@app.route('/predict-post-injury', methods=['POST'])
def predict():
    if not model:
        return jsonify({'status': 'error', 'message': 'Model not loaded'}), 500

    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = [
            'Match3_before_injury_Player_rating',
            'Match2_before_injury_Player_rating',
            'Match1_before_injury_Player_rating',
            'Total_Before_Injury_GD',
            'Match1_before_injury_Result',
            'Injury',
            'Match2_before_injury_Result',
            'Age',
            'Missed_Matches',
            'FIFA_rating'
        ]
        
        for field in required_fields:
            if field not in data:
                return jsonify({'status': 'error', 'message': f'Missing field: {field}'}), 400

        # Encode categorical data
        try:
            injury_encoded = injury_encoder.transform([data['Injury']])[0]
        except ValueError:
            injury_encoded = injury_encoder.transform(["Unknown injury"])[0]
            
        match1_result_encoded = result_encoder.transform([data['Match1_before_injury_Result']])[0]
        match2_result_encoded = result_encoder.transform([data['Match2_before_injury_Result']])[0]

        # Prepare feature array
        features = [
            float(data['Match3_before_injury_Player_rating']),
            float(data['Match2_before_injury_Player_rating']),
            float(data['Match1_before_injury_Player_rating']),
            float(data['Total_Before_Injury_GD']),
            match1_result_encoded,
            injury_encoded,
            match2_result_encoded,
            float(data['Age']),
            float(data['Missed_Matches']),
            float(data['FIFA_rating'])
        ]

        # Make prediction (binary classification)
        prediction = int(model.predict([features])[0])  # Convert to int for JSON serialization
        probabilities = model.predict_proba([features])[0]
        confidence = float(np.max(probabilities))
        
        # For binary classification (0: Not Improved, 1: Improved)
        return jsonify({
            'status': 'success',
            'predicted_performance': "Improved" if prediction == 1 else "Not Improved",
            'improvement': bool(prediction == 1)  # Convert to bool after ensuring it's JSON serializable
        })

    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True)