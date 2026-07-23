from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import os

app = Flask(__name__)

frontend_url = os.environ.get('FRONTEND_URL', '*')
if frontend_url == '*':
    CORS(app)
else:
    CORS(app, origins=[frontend_url, 'http://localhost:5173'])

model_path = os.path.join(os.path.dirname(__file__), 'model.pkl')
encoders_path = os.path.join(os.path.dirname(__file__), 'encoders.pkl')

if not os.path.exists(model_path) or not os.path.exists(encoders_path):
    raise FileNotFoundError(
        'Model files missing. Run "python retrain_model.py" from the project root.'
    )

with open(model_path, 'rb') as f:
    model = pickle.load(f)

with open(encoders_path, 'rb') as f:
    encoders = pickle.load(f)

target_encoder = encoders['target']

FEATURE_NAMES = [
    'Gender', 'Age', 'Occupation', 'Sleep Duration', 'Quality of Sleep',
    'Physical Activity Level', 'Stress Level', 'BMI Category',
    'Blood Pressure', 'Heart Rate', 'Daily Steps'
]


def extract_features(data):
    return [
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


def apply_heuristic_rules(data, ml_prediction, ml_probabilities):
    """
    Apply heuristic rules to override ML predictions when inputs clearly indicate sleep disorders.
    This makes the demo more realistic and useful.
    """
    sleep_duration = float(data.get('sleep_duration', 7))
    sleep_quality = float(data.get('quality_of_sleep', 7))
    stress_level = float(data.get('stress_level', 5))
    heart_rate = float(data.get('heart_rate', 72))
    
    # Rule 1: Very poor sleep (less than 5 hours OR quality <= 3)
    if sleep_duration < 5 or sleep_quality <= 3:
        if stress_level >= 7:
            return 'Insomnia', {str(cls): (0.8 if 'Insomnia' in str(cls) else 0.1) for cls in ml_probabilities.keys()}
        else:
            return 'Sleep Apnea', {str(cls): (0.75 if 'Apnea' in str(cls) else 0.125) for cls in ml_probabilities.keys()}
    
    # Rule 2: High stress (8-10) with poor sleep quality (<= 5)
    if stress_level >= 8 and sleep_quality <= 5:
        return 'Insomnia', {str(cls): (0.7 if 'Insomnia' in str(cls) else 0.15) for cls in ml_probabilities.keys()}
    
    # Rule 3: Elevated heart rate (>= 90) with poor sleep
    if heart_rate >= 90 and (sleep_duration < 6 or sleep_quality <= 5):
        return 'Sleep Apnea', {str(cls): (0.7 if 'Apnea' in str(cls) else 0.15) for cls in ml_probabilities.keys()}
    
    # Rule 4: Combination of moderate risk factors
    risk_score = 0
    if sleep_duration < 6: risk_score += 2
    if sleep_quality <= 5: risk_score += 2
    if stress_level >= 7: risk_score += 2
    if heart_rate >= 85: risk_score += 1
    
    if risk_score >= 5:
        return 'Insomnia', {str(cls): (0.65 if 'Insomnia' in str(cls) else 0.175) for cls in ml_probabilities.keys()}
    
    # Default to ML prediction if no rules triggered
    return ml_prediction, ml_probabilities


@app.route('/', methods=['GET'])
def index():
    return jsonify({
        'service': 'Sleep Oracle API',
        'endpoints': {
            'predict': 'POST /predict',
            'health': 'GET /health'
        }
    })


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Request body must be JSON', 'status': 'error'}), 400

        features = extract_features(data)
        df = pd.DataFrame([features], columns=FEATURE_NAMES)

        prediction_numeric = model.predict(df)[0]
        prediction_label = target_encoder.inverse_transform([prediction_numeric])[0]

        probabilities = model.predict_proba(df)[0]
        class_probabilities = {
            str(cls): float(prob)
            for cls, prob in zip(target_encoder.classes_, probabilities)
        }

        # Apply heuristic rules to improve prediction accuracy
        final_prediction, final_probabilities = apply_heuristic_rules(data, prediction_label, class_probabilities)

        return jsonify({
            'prediction': final_prediction,
            'probabilities': final_probabilities,
            'status': 'success'
        })
    except Exception as e:
        return jsonify({'error': str(e), 'status': 'error'}), 500


@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'model': 'loaded'})


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
