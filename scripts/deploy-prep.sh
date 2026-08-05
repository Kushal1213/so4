#!/usr/bin/env bash
set -euo pipefail

echo "==> Sleep Oracle deployment prep"

echo "-> Training ML model"
python retrain_model.py

echo "-> Building frontend"
cd frontend
npm ci
npm run build
cd ..

echo "-> Running backend smoke test"
cd app
python -c "
import app as application
client = application.app.test_client()
assert client.get('/health').status_code == 200
payload = {
    'gender': 1, 'age': 32, 'occupation': 9,
    'sleep_duration': 6.8, 'quality_of_sleep': 6,
    'physical_activity': 40, 'stress_level': 6,
    'bmi_category': 0, 'blood_pressure': 120,
    'heart_rate': 74, 'daily_steps': 6500,
}
response = client.post('/api/dashboard', json=payload)
assert response.status_code == 200
print('Smoke test passed')
"
cd ..

echo "==> Ready for deployment"
echo "Docker:  docker compose up --build"
echo "Render:  push to GitHub, then New Blueprint in Render dashboard"
