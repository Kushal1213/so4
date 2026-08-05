<<<<<<< HEAD
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
=======
# 🌙 Sleep Oracle: AI-Powered Sleep Disorder Detection

A modern full-stack Machine Learning application that predicts sleep disorders using advanced algorithms. Built with React, Flask, and scikit-learn.

---

## ✨ Features

- **AI-Powered Predictions**: Random Forest classifier trained on real sleep health data
- **Beautiful UI**: Modern sleep-themed design with smooth animations
- **Real-time Analysis**: Instant predictions with probability visualization
- **User-Friendly**: Dropdown selectors instead of numeric codes
- **One-Click Demo**: Try the app instantly with sample data
- **Health Recommendations**: Personalized tips based on predictions
- **Responsive**: Works perfectly on mobile and desktop
- **Production Ready**: Deploy to Render free tier in minutes

---

## 🔍 Project Phases

| Phase | Description |
|-------|-------------|
| **Ideation** | Brainstorming, idea prioritization, and empathy mapping |
| **Planning** | Project planning, timeline, and technology stack selection |
| **Design** | Solution architecture, data flow diagrams, user stories |
| **Development** | Data preprocessing, model training, Flask web app + React frontend |
| **Testing & Submission** | Performance testing, final project report |

---

## 🧠 ML Model

- **Dataset:** Sleep Health and Lifestyle Dataset (374 records, 13 features)
- **Algorithm:** Random Forest Classifier
- **Features used:** Age, Gender, Occupation, Sleep Duration, Sleep Quality, Physical Activity Level, Stress Level, BMI Category, Heart Rate, Daily Steps, Blood Pressure
- **Target:** Sleep Disorder (None / Sleep Apnea / Insomnia)

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Language | Python 3.x, JavaScript |
| ML Libraries | scikit-learn, pandas, numpy, matplotlib, seaborn |
| Backend | Flask |
| Frontend | React, HTML, CSS, Bootstrap |
| Model Serialization | pickle |
| Notebook | Jupyter Notebook |

---

## 📂 Repository Structure

```
Sleep-Oracle/
├── app/                    # Flask backend
│   ├── app.py
│   ├── model.pkl
│   ├── encoders.pkl
│   └── templates/          # HTML templates
├── frontend/               # React frontend
│   ├── src/
│   ├── package.json
│   └── render.yaml
├── dataset/                # Training data
├── notebooks/              # Jupyter notebooks (EDA + Model training)
├── docs/                   # Phase-wise project documentation (PDFs)
│   ├── ideation/
│   ├── planning/
│   ├── design/
│   ├── development/
│   └── final/
├── assets/                 # Static assets
├── requirements.txt
└── render.yaml
```

---

## 🚀 Quick Start

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/Kushal1213/Sleep-Oracle.git
cd Sleep-Oracle

# 2. Install dependencies
pip install -r requirements.txt

# Backend
cd app
python app.py

# Frontend (in a new terminal)
cd frontend
npm install
npm run dev

# 3. Open in browser
# Visit: http://127.0.0.1:5173 (React frontend)
```

### Deploy to Render (Recommended - Free Tier)

**Option 1: One-Click Blueprint (Easiest)**
1. Push code to GitHub
2. Go to Render Dashboard → New → Blueprint
3. Connect your repository
4. Render auto-detects `render.yaml` - click "Apply"
5. Done! Both backend and frontend deploy automatically

**Option 2: Manual Deployment**
See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed steps.

---

## 🔌 API Endpoints

- `POST /predict` - Predict sleep disorder
- `GET /health` - Health check

---

## 📊 Results

- Model trained and evaluated with cross-validation
- Performance metrics documented in `docs/final/Performance-Testing-ML.pdf`
- Full project report available in `docs/final/Project-Report.pdf`

---

## 📄 License

This project was developed as part of a guided project program.
>>>>>>> d01f353f9618da27ee51f94535596529dcc7629f
