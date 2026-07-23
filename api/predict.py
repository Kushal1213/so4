import os
import sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load the trained model
model_path = os.path.join(os.path.dirname(__file__), '..', 'app', 'model.pkl')
with open(model_path, 'rb') as f:
    model = pickle.load(f)

# Load the encoders
encoders_path = os.path.join(os.path.dirname(__file__), '..', 'app', 'encoders.pkl')
with open(encoders_path, 'rb') as f:
    encoders = pickle.load(f)

target_encoder = encoders['target']

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        
        # Create DataFrame with proper feature names
        feature_names = ['Gender', 'Age', 'Occupation', 'Sleep Duration', 'Quality of Sleep',
                        'Physical Activity Level', 'Stress Level', 'BMI Category',
                        'Blood Pressure', 'Heart Rate', 'Daily Steps']
        
        features = [
            float(data.get('gender', 0)),
            float(data.get('age', 30)),
            float(data.get('occupation', 0)),
            float(data.get('sleep_duration', 7)),
            float(data.get('quality_of_sleep', 7)),
            float(data.get('physical_activity', 60)),
            float(data.get('stress_level', 5)),
            float(data.get('bmi_category', 0)),
            float(data.get('blood_pressure', 120)),
            float(data.get('heart_rate', 72)),
            float(data.get('daily_steps', 8000))
        ]
        
        # Create DataFrame with feature names
        df = pd.DataFrame([features], columns=feature_names)
        
        # Make prediction
        prediction_numeric = model.predict(df)[0]
        prediction_label = target_encoder.inverse_transform([prediction_numeric])[0]
        
        # Get prediction probabilities
        probabilities = model.predict_proba(df)[0]
        class_probabilities = dict(zip(target_encoder.classes_, probabilities))
        
        return jsonify({
            'prediction': prediction_label,
            'probabilities': class_probabilities,
            'status': 'success'
        })
    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'model': 'loaded'})

# Vercel requires the app to be exported
def handler(environ, start_response):
    return app(environ, start_response)
