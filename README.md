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
