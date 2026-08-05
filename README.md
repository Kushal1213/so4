# Sleep Oracle - AI Sleep Intelligence Platform

The complete AI sleep intelligence platform. An end-to-end sleep ecosystem for individuals, clinicians, researchers, and organizations to understand, improve, monitor, and optimize sleep using AI.

## Platform Modules

| Module | Route | Description |
|--------|-------|-------------|
| AI Sleep Assessment | `/app/assessment` | 12+ predictive metrics from one intake |
| Personal Dashboard | `/app/dashboard` | Scores, trends, debt, recovery |
| AI Sleep Coach | `/app/coach` | Daily bedtime, caffeine, recovery guidance |
| Habit Tracking | `/app/habits` | Bedtime, caffeine, exercise, stress logs |
| Sleep Journal | `/app/journal` | Mood, energy, focus with AI correlations |
| Smart Analytics | `/app/analytics` | Trends, heatmaps, quality distribution |
| Risk Prediction | `/app/risks` | Insomnia, apnea, burnout, fatigue screening |
| Explainable AI | `/app/risks` | Factor-level explanations per risk |
| AI Chat Assistant | `/app/chat` | Natural-language sleep Q&A |
| Sleep Plans | `/app/plans` | Personalized 30-day improvement plans |
| Environment Analyzer | `/app/environment` | Room factors impact modeling |
| Smart Alarm | `/app/alarm` | Optimal bedtime and wake windows |
| Wearable Integration | `/app/wearables` | Simulated Apple Watch, Fitbit, Garmin, WHOOP |
| Sleep Timeline | `/app/timeline` | Weekly, monthly, yearly tracking |
| Recovery Intelligence | `/app/recovery` | Energy, fatigue, workout readiness |
| Challenges | `/app/challenges` | XP, streaks, achievements, leaderboard |
| Family Dashboard | `/app/family` | Household sleep monitoring |
| Enterprise Analytics | `/app/enterprise` | Anonymous workforce sleep metrics |
| Research Platform | `/app/research` | Cohort analysis and data export |
| Sleep API | `/app/api` | SaaS-style REST endpoints |
| Admin Dashboard | `/app/admin` | Platform metrics and model performance |
| Roadmap | `/app/roadmap` | Future production integrations |

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Vite, Tailwind CSS, Recharts, Motion, React Router |
| Backend | Flask, scikit-learn, pandas |
| ML | Random Forest classifier (sleep disorder screening) |
| Deployment | Render, Vercel |

## Architecture

```
React / Vite
  -> API Gateway (Flask)
  -> Sleep Assessment Service
  -> Prediction Service
  -> Recommendation Engine
  -> LLM Sleep Coach
  -> Analytics Service
  -> PostgreSQL / Redis / MLflow (roadmap)
  -> Docker / GitHub Actions (roadmap)
```

## Quick Start

### 1. Train the model

```bash
python retrain_model.py
```

### 2. Start the backend

```bash
cd app
python app.py
```

### 3. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` for the landing page and `http://localhost:5173/app/dashboard` for the platform.

## API Endpoints

- `POST /predict` - ML disorder screening + scores
- `POST /api/assessment` - Full assessment metrics
- `POST /api/dashboard` - Dashboard payload
- `POST /api/coach/daily` - Daily coaching
- `POST /api/analytics` - Analytics bundle
- `POST /api/risks` - Multi-model risk predictions
- `POST /api/chat` - AI assistant
- `GET /api/admin/metrics` - Admin metrics

See `/app/api` in the frontend for the full API catalog.

## Future Roadmap

- Live wearable integrations (Apple Health, Google Fit, Fitbit)
- Smart home integration (lights, thermostats)
- Snoring detection from audio
- Sleep stage estimation from sensor data
- Clinical decision support
- Multi-language AI coach

## Deployment

See **[DEPLOYMENT.md](DEPLOYMENT.md)** for full instructions.

### Docker (one command)

```bash
docker compose up --build
```

- Frontend: http://localhost:4173
- Backend: http://localhost:5000

### Render (free cloud)

1. Push repo to GitHub
2. Render Dashboard -> **New Blueprint** -> connect repo
3. Set `FRONTEND_URL` on backend and `VITE_API_URL` on frontend
4. Redeploy frontend

### CI/CD

GitHub Actions runs backend smoke tests and frontend builds on every push (`.github/workflows/ci.yml`).

## Disclaimer

Sleep Oracle is a screening and wellness tool. It does not diagnose, treat, or replace care from a qualified healthcare professional.
