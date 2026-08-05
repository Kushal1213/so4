from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import os
<<<<<<< HEAD
import sys

sys.path.insert(0, os.path.dirname(__file__))

from services.sleep_intelligence import (
    analyze_environment,
    chat_response,
    compute_assessment_scores,
    correlate_journal,
    explain_prediction,
    generate_admin_metrics,
    generate_analytics,
    generate_challenges,
    generate_daily_coach,
    generate_enterprise_analytics,
    generate_family_dashboard,
    generate_notifications,
    generate_recovery_intelligence,
    generate_research_summary,
    generate_risk_predictions,
    generate_sleep_plan,
    generate_timeline,
    generate_wearable_data,
    optimize_alarm,
)

app = Flask(__name__)

def _normalize_origin(url: str) -> str:
    url = url.strip()
    if not url or url == '*':
        return url
    if not url.startswith('http'):
        return f'https://{url}'
    return url.rstrip('/')


def _cors_origins() -> list[str]:
    raw = os.environ.get('FRONTEND_URL', '*')
    if raw == '*':
        return ['*']
    origins = {_normalize_origin(origin) for origin in raw.split(',') if origin.strip()}
    origins.update({
        'http://localhost:5173',
        'http://localhost:4173',
        'http://127.0.0.1:5173',
        'http://127.0.0.1:4173',
    })
    return sorted(origins)


cors_origins = _cors_origins()
if cors_origins == ['*']:
    CORS(app)
else:
    CORS(app, origins=cors_origins)
=======

app = Flask(__name__)

frontend_url = os.environ.get('FRONTEND_URL', '*')
if frontend_url == '*':
    CORS(app)
else:
    CORS(app, origins=[frontend_url, 'http://localhost:5173'])
>>>>>>> d01f353f9618da27ee51f94535596529dcc7629f

model_path = os.path.join(os.path.dirname(__file__), 'model.pkl')
encoders_path = os.path.join(os.path.dirname(__file__), 'encoders.pkl')

<<<<<<< HEAD
model = None
target_encoder = None

if os.path.exists(model_path) and os.path.exists(encoders_path):
    with open(model_path, 'rb') as f:
        model = pickle.load(f)
    with open(encoders_path, 'rb') as f:
        encoders = pickle.load(f)
    target_encoder = encoders['target']
=======
if not os.path.exists(model_path) or not os.path.exists(encoders_path):
    raise FileNotFoundError(
        'Model files missing. Run "python retrain_model.py" from the project root.'
    )

with open(model_path, 'rb') as f:
    model = pickle.load(f)

with open(encoders_path, 'rb') as f:
    encoders = pickle.load(f)

target_encoder = encoders['target']
>>>>>>> d01f353f9618da27ee51f94535596529dcc7629f

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
<<<<<<< HEAD
=======
    """
    Apply heuristic rules to override ML predictions when inputs clearly indicate sleep disorders.
    This makes the demo more realistic and useful.
    """
>>>>>>> d01f353f9618da27ee51f94535596529dcc7629f
    sleep_duration = float(data.get('sleep_duration', 7))
    sleep_quality = float(data.get('quality_of_sleep', 7))
    stress_level = float(data.get('stress_level', 5))
    heart_rate = float(data.get('heart_rate', 72))
<<<<<<< HEAD

    if sleep_duration < 5 or sleep_quality <= 3:
        if stress_level >= 7:
            return 'Insomnia', {str(cls): (0.8 if 'Insomnia' in str(cls) else 0.1) for cls in ml_probabilities.keys()}
        return 'Sleep Apnea', {str(cls): (0.75 if 'Apnea' in str(cls) else 0.125) for cls in ml_probabilities.keys()}

    if stress_level >= 8 and sleep_quality <= 5:
        return 'Insomnia', {str(cls): (0.7 if 'Insomnia' in str(cls) else 0.15) for cls in ml_probabilities.keys()}

    if heart_rate >= 90 and (sleep_duration < 6 or sleep_quality <= 5):
        return 'Sleep Apnea', {str(cls): (0.7 if 'Apnea' in str(cls) else 0.15) for cls in ml_probabilities.keys()}

    risk_score = 0
    if sleep_duration < 6:
        risk_score += 2
    if sleep_quality <= 5:
        risk_score += 2
    if stress_level >= 7:
        risk_score += 2
    if heart_rate >= 85:
        risk_score += 1

    if risk_score >= 5:
        return 'Insomnia', {str(cls): (0.65 if 'Insomnia' in str(cls) else 0.175) for cls in ml_probabilities.keys()}

    return ml_prediction, ml_probabilities


def get_json_body():
    data = request.get_json(silent=True)
    return data if isinstance(data, dict) else {}


def default_profile(data=None):
    data = data or {}
    return {
        'gender': data.get('gender', 1),
        'age': data.get('age', 32),
        'occupation': data.get('occupation', 9),
        'sleep_duration': data.get('sleep_duration', 6.8),
        'quality_of_sleep': data.get('quality_of_sleep', 6),
        'physical_activity': data.get('physical_activity', 40),
        'stress_level': data.get('stress_level', 6),
        'bmi_category': data.get('bmi_category', 0),
        'blood_pressure': data.get('blood_pressure', 120),
        'heart_rate': data.get('heart_rate', 74),
        'daily_steps': data.get('daily_steps', 6500),
    }


=======
    
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


>>>>>>> d01f353f9618da27ee51f94535596529dcc7629f
@app.route('/', methods=['GET'])
def index():
    return jsonify({
        'service': 'Sleep Oracle API',
<<<<<<< HEAD
        'version': '2.0.0',
        'platform': 'Sleep Intelligence Platform',
        'endpoints': {
            'predict': 'POST /predict',
            'assessment': 'POST /api/assessment',
            'dashboard': 'POST /api/dashboard',
            'coach': 'POST /api/coach/daily',
            'analytics': 'POST /api/analytics',
            'risks': 'POST /api/risks',
            'explain': 'POST /api/explain',
            'chat': 'POST /api/chat',
            'plan': 'POST /api/plan',
            'environment': 'POST /api/environment',
            'alarm': 'POST /api/alarm',
            'wearable': 'POST /api/wearable',
            'timeline': 'POST /api/timeline',
            'recovery': 'POST /api/recovery',
            'challenges': 'GET /api/challenges',
            'family': 'GET /api/family',
            'enterprise': 'GET /api/enterprise',
            'research': 'GET /api/research',
            'admin': 'GET /api/admin/metrics',
            'notifications': 'POST /api/notifications',
            'journal_insights': 'POST /api/journal/insights',
            'health': 'GET /health',
=======
        'endpoints': {
            'predict': 'POST /predict',
            'health': 'GET /health'
>>>>>>> d01f353f9618da27ee51f94535596529dcc7629f
        }
    })


<<<<<<< HEAD
@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy',
        'model': 'loaded' if model is not None else 'unavailable',
        'services': ['prediction', 'analytics', 'coach', 'recovery', 'enterprise']
    })


@app.route('/predict', methods=['POST'])
def predict():
    try:
        if model is None:
            return jsonify({'error': 'Model not loaded. Run retrain_model.py.', 'status': 'error'}), 503

        data = get_json_body()
=======
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Request body must be JSON', 'status': 'error'}), 400

>>>>>>> d01f353f9618da27ee51f94535596529dcc7629f
        features = extract_features(data)
        df = pd.DataFrame([features], columns=FEATURE_NAMES)

        prediction_numeric = model.predict(df)[0]
        prediction_label = target_encoder.inverse_transform([prediction_numeric])[0]
<<<<<<< HEAD
=======

>>>>>>> d01f353f9618da27ee51f94535596529dcc7629f
        probabilities = model.predict_proba(df)[0]
        class_probabilities = {
            str(cls): float(prob)
            for cls, prob in zip(target_encoder.classes_, probabilities)
        }

<<<<<<< HEAD
        final_prediction, final_probabilities = apply_heuristic_rules(data, prediction_label, class_probabilities)
        scores = compute_assessment_scores(data)
=======
        # Apply heuristic rules to improve prediction accuracy
        final_prediction, final_probabilities = apply_heuristic_rules(data, prediction_label, class_probabilities)
>>>>>>> d01f353f9618da27ee51f94535596529dcc7629f

        return jsonify({
            'prediction': final_prediction,
            'probabilities': final_probabilities,
<<<<<<< HEAD
            'scores': scores,
=======
>>>>>>> d01f353f9618da27ee51f94535596529dcc7629f
            'status': 'success'
        })
    except Exception as e:
        return jsonify({'error': str(e), 'status': 'error'}), 500


<<<<<<< HEAD
@app.route('/api/assessment', methods=['POST'])
def assessment():
    data = default_profile(get_json_body())
    scores = compute_assessment_scores(data)
    disorder = 'No Disorder'
    if scores['insomnia_risk'] >= scores['sleep_apnea_risk'] and scores['insomnia_risk'] >= 55:
        disorder = 'Insomnia'
    elif scores['sleep_apnea_risk'] >= 55:
        disorder = 'Sleep Apnea'

    return jsonify({
        'status': 'success',
        'sleep_disorder_screening': disorder,
        'metrics': scores,
    })


@app.route('/api/dashboard', methods=['POST'])
def dashboard():
    data = default_profile(get_json_body())
    scores = compute_assessment_scores(data)
    analytics = generate_analytics(data)
    return jsonify({
        'status': 'success',
        'overall_sleep_score': scores['overall_sleep_score'],
        'weekly_trend': analytics['trend'][-7:],
        'monthly_trend': analytics['trend'],
        'average_sleep_duration': analytics['monthly_average_hours'],
        'sleep_debt_hours': analytics['sleep_debt_hours'],
        'recovery_score': scores['recovery_score'],
        'stress_impact': round(float(data.get('stress_level', 5)) * 10, 1),
        'lifestyle_score': round(scores['sleep_consistency'] * 0.6 + scores['circadian_rhythm_score'] * 0.4, 1),
        'goal_progress_percent': round(min(100, scores['overall_sleep_score'] * 0.95), 1),
        'bedtime_consistency': round(scores['sleep_consistency'], 1),
        'wake_consistency': round(scores['sleep_consistency'] - 4, 1),
    })


@app.route('/api/coach/daily', methods=['POST'])
def coach_daily():
    return jsonify({'status': 'success', **generate_daily_coach(default_profile(get_json_body()))})


@app.route('/api/analytics', methods=['POST'])
def analytics():
    data = default_profile(get_json_body())
    return jsonify({'status': 'success', **generate_analytics(data)})


@app.route('/api/risks', methods=['POST'])
def risks():
    data = default_profile(get_json_body())
    return jsonify({'status': 'success', 'predictions': generate_risk_predictions(data)})


@app.route('/api/explain', methods=['POST'])
def explain():
    data = default_profile(get_json_body())
    body = get_json_body()
    risk_key = body.get('risk_key', 'insomnia_risk')
    scores = compute_assessment_scores(data)
    value = scores.get(risk_key, scores['insomnia_risk'])
    return jsonify({'status': 'success', **explain_prediction(data, risk_key, value)})


@app.route('/api/chat', methods=['POST'])
def chat():
    body = get_json_body()
    message = body.get('message', '')
    profile = default_profile(body.get('profile', body))
    return jsonify({'status': 'success', **chat_response(message, profile)})


@app.route('/api/plan', methods=['POST'])
def plan():
    return jsonify({'status': 'success', **generate_sleep_plan(default_profile(get_json_body()))})


@app.route('/api/environment', methods=['POST'])
def environment():
    return jsonify({'status': 'success', **analyze_environment(get_json_body())})


@app.route('/api/alarm', methods=['POST'])
def alarm():
    return jsonify({'status': 'success', **optimize_alarm(default_profile(get_json_body()))})


@app.route('/api/wearable', methods=['POST'])
def wearable():
    body = get_json_body()
    profile = default_profile(body.get('profile', body))
    device = body.get('device', 'Apple Watch')
    return jsonify({'status': 'success', **generate_wearable_data(profile, device)})


@app.route('/api/timeline', methods=['POST'])
def timeline():
    body = get_json_body()
    profile = default_profile(body.get('profile', body))
    period = body.get('period', 'monthly')
    return jsonify({'status': 'success', 'period': period, 'data': generate_timeline(profile, period)})


@app.route('/api/recovery', methods=['POST'])
def recovery():
    return jsonify({'status': 'success', **generate_recovery_intelligence(default_profile(get_json_body()))})


@app.route('/api/challenges', methods=['GET'])
def challenges():
    return jsonify({'status': 'success', **generate_challenges()})


@app.route('/api/family', methods=['GET'])
def family():
    return jsonify({'status': 'success', **generate_family_dashboard()})


@app.route('/api/enterprise', methods=['GET'])
def enterprise():
    return jsonify({'status': 'success', **generate_enterprise_analytics()})


@app.route('/api/research', methods=['GET'])
def research():
    return jsonify({'status': 'success', **generate_research_summary()})


@app.route('/api/admin/metrics', methods=['GET'])
def admin_metrics():
    return jsonify({'status': 'success', **generate_admin_metrics()})


@app.route('/api/notifications', methods=['POST'])
def notifications():
    return jsonify({'status': 'success', 'notifications': generate_notifications(default_profile(get_json_body()))})


@app.route('/api/journal/insights', methods=['POST'])
def journal_insights():
    body = get_json_body()
    entries = body.get('entries', [])
    return jsonify({'status': 'success', **correlate_journal(entries)})
=======
@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'model': 'loaded'})
>>>>>>> d01f353f9618da27ee51f94535596529dcc7629f


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
