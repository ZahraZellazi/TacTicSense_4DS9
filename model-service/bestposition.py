from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

# Load the pre-trained model
model = joblib.load('stacking_model.pkl')

# Position mapping
position_mapping = {
    0: 'CAM',  # Milieu offensif
    1: 'CDM',  # Milieu défensif
    2: 'CM',   # Milieu central
    3: 'GK',   # Gardien
    4: 'LB',   # Arrière gauche
    5: 'LM',   # Milieu gauche
    6: 'LWB',  # Arrière latéral gauche
    7: 'RB',   # Arrière droit
    8: 'RM',   # Milieu droit
    9: 'RW',   # Ailier droit
    10: 'RWB', # Arrière latéral droit
    11: 'ST'   # Avant-centre
}

@app.route('/predict-best-position', methods=['POST'])
def predict_best_position():
    try:
        # Get data from request
        data = request.get_json(force=True)
        
        # Validate all required fields are present
        required_fields = [
            'Att_position', 'Total_defending', 'Finishing', 'Sliding_tackle',
            'Standing_tackle', 'Defensive_awareness', 'Crossing', 'Interceptions',
            'Dribbling', 'Long_shots', 'Defending_Pace', 'Total_skill',
            'Total_attacking', 'Volleys', 'Curve', 'Total_movement',
            'Penalties', 'Heading_accuracy', 'Skill_moves', 'Acceleration'
        ]
        
        for field in required_fields:
            if field not in data:
                return jsonify({
                    'status': 'error',
                    'message': f'Missing required field: {field}'
                }), 400

        # Prepare features in correct order with type conversion
        features = [
            float(data['Att_position']),
            float(data['Total_defending']),
            float(data['Finishing']),
            float(data['Sliding_tackle']),
            float(data['Standing_tackle']),
            float(data['Defensive_awareness']),
            float(data['Crossing']),
            float(data['Interceptions']),
            float(data['Dribbling']),
            float(data['Long_shots']),
            float(data['Defending_Pace']),
            float(data['Total_skill']),
            float(data['Total_attacking']),
            float(data['Volleys']),
            float(data['Curve']),
            float(data['Total_movement']),
            float(data['Penalties']),
            float(data['Heading_accuracy']),
            int(data['Skill_moves']),
            float(data['Acceleration'])
        ]
        
        # Convert to numpy array and reshape for prediction
        features_array = np.array(features).reshape(1, -1)
        
        # Make prediction
        prediction = model.predict(features_array)
        
        # Get the position code and name
        predicted_code = int(prediction[0])
        predicted_position = position_mapping.get(predicted_code, 'Unknown')
        
        return jsonify({
            'status': 'success',
            'predicted_position': predicted_position,
            'position_code': predicted_code
        })
        
    except ValueError as e:
        return jsonify({
            'status': 'error',
            'message': f'Invalid input value: {str(e)}'
        }), 400
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'An unexpected error occurred: {str(e)}'
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)