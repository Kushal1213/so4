$ErrorActionPreference = "Stop"

Write-Host "==> Sleep Oracle deployment prep"

Write-Host "-> Training ML model"
python retrain_model.py

Write-Host "-> Building frontend"
Push-Location frontend
npm ci
npm run build
Pop-Location

Write-Host "-> Running backend smoke test"
Push-Location app
python -c @"
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
"@
Pop-Location

Write-Host "==> Ready for deployment"
Write-Host "Docker:  docker compose up --build"
Write-Host "Render:  push to GitHub, then New Blueprint in Render dashboard"
