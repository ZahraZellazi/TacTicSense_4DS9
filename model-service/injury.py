from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
from sklearn.preprocessing import LabelEncoder, StandardScaler
import traceback
from datetime import datetime
import numpy as np

# Initialisation de l'application Flask
app = Flask(__name__)
CORS(app)  # Active CORS pour toutes les routes

# Paramètres de normalisation (à remplacer par vos valeurs réelles)
TARGET_SCALER_PARAMS = {
    'mean': 30.5,    # Moyenne de votre cible pendant l'entraînement
    'std': 45.2,     # Écart-type de votre cible pendant l'entraînement
    'min': 1,        # Minimum de votre cible
    'max': 365       # Maximum de votre cible
}

# Catégories pour les encodeurs
INJURY_CATEGORIES = [
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

SEVERITY_CATEGORIES = ["Low", "Moderate", "High"]

# Chargement du modèle et des encodeurs
try:
    print("Chargement du modèle et des encodeurs...")
    
    # Chargement du modèle
    with open('xgboost_injury_duration_model.pkl', 'rb') as f:
        model = pickle.load(f)
    
    # Initialisation et entraînement des encodeurs
    injury_encoder = LabelEncoder()
    severity_encoder = LabelEncoder()
    
    injury_encoder.fit(INJURY_CATEGORIES)
    severity_encoder.fit(SEVERITY_CATEGORIES)
    
    # Debug: Afficher les features attendues par le modèle
    if hasattr(model, 'feature_names_in_'):
        print("Features attendues par le modèle:", model.feature_names_in_)
    elif hasattr(model, 'get_booster'):
        print("Features attendues par le modèle:", model.get_booster().feature_names)
    
    print("Modèle et encodeurs chargés avec succès!")
except Exception as e:
    print(f"Erreur lors du chargement du modèle ou des encodeurs: {str(e)}")
    traceback.print_exc()
    raise

def denormalize_prediction(normalized_value, method='standard'):
    """
    Convertit une valeur normalisée en valeur réelle
    """
    if method == 'standard':
        # Dénormalisation standard (si StandardScaler a été utilisé)
        return (normalized_value * TARGET_SCALER_PARAMS['std']) + TARGET_SCALER_PARAMS['mean']
    else:
        # Dénormalisation min-max (si MinMaxScaler a été utilisé)
        return normalized_value * (TARGET_SCALER_PARAMS['max'] - TARGET_SCALER_PARAMS['min']) + TARGET_SCALER_PARAMS['min']

# Route de test
@app.route('/')
def home():
    return "Serveur de prédiction de durée de blessure en cours d'exécution"

# Route de santé
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'}), 200

# Route de prédiction principale
@app.route('/predict', methods=['POST', 'OPTIONS'])
def predict():
    # Gestion des requêtes OPTIONS pour CORS
    if request.method == 'OPTIONS':
        response = jsonify({'status': 'success'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', '*')
        response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
        return response, 200
    
    try:
        # Vérification que la requête contient des données JSON
        if not request.is_json:
            return jsonify({
                'status': 'error',
                'error': 'Request must be JSON',
                'message': 'Veuillez envoyer les données au format JSON'
            }), 400
            
        data = request.get_json()
        print("Données reçues:", data)
        
        # Validation des champs obligatoires
        required_fields = [
            'fifa_rating', 'injury', 'severity_level',
            'date_of_injury', 'season', 'average_before_injury_rating'
        ]
        
        missing_fields = [field for field in required_fields if field not in data or data[field] in [None, '']]
        if missing_fields:
            return jsonify({
                'status': 'error',
                'error': 'Champs obligatoires manquants',
                'missing_fields': missing_fields,
                'message': 'Veuillez fournir tous les champs obligatoires'
            }), 400
            
        # Préparation des données
        processed_data = preprocess_input(data)
        print("Données prétraitées:", processed_data)
        
        # Prédiction
        normalized_prediction = model.predict(processed_data)
        print("Prédiction normalisée:", normalized_prediction)
        
        # Dénormalisation
        predicted_duration = denormalize_prediction(normalized_prediction[0])
        predicted_duration = max(1, round(float(predicted_duration)))  # Au moins 1 jour et arrondi
        
        # Réponse
        response = jsonify({
            'status': 'success',
            'predicted_duration': predicted_duration,
            'unit': 'days'
        })
        
        # Ajout des headers CORS
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
        
    except Exception as e:
        traceback.print_exc()
        response = jsonify({
            'status': 'error',
            'error': str(e),
            'message': 'Une erreur est survenue lors de la prédiction'
        })
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response, 500

def preprocess_input(data):
    """Prétraitement des données d'entrée pour le modèle"""
    try:
        # Création du DataFrame avec les données brutes
        df = pd.DataFrame({
            'FIFA rating': [float(data['fifa_rating'])],
            'Injury': [data['injury']],
            'severity_level': [data['severity_level']],
            'Date of Injury': [data['date_of_injury']],
            'Season': [data['season']],
            'Average_Before_Injury_Player_Rating': [float(data['average_before_injury_rating'])]
        })
        
        # Conversion et extraction des features de date
        df['Date of Injury'] = pd.to_datetime(df['Date of Injury'])
        df['injury_month'] = df['Date of Injury'].dt.month
        df['injury_year'] = df['Date of Injury'].dt.year
        
        # Encodage des variables catégorielles
        df['Injury'] = injury_encoder.transform(df['Injury'])
        df['severity_level'] = severity_encoder.transform(df['severity_level'])
        
        # Extraction de l'année de début de saison
        df['season_start'] = df['Season'].apply(lambda x: int(x.split('-')[0]))
        
        # Features finales (doivent correspondre exactement à l'entraînement)
        final_features = [
            'FIFA rating',
            'Injury',
            'severity_level',
            'Average_Before_Injury_Player_Rating',
            'injury_month',
            'season_start'
        ]
        
        # Vérification que toutes les features attendues sont présentes
        missing_features = [f for f in final_features if f not in df.columns]
        if missing_features:
            raise ValueError(f"Features manquantes dans les données prétraitées: {missing_features}")
        
        return df[final_features]
    except Exception as e:
        raise ValueError(f"Échec du prétraitement des données: {str(e)}")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True)