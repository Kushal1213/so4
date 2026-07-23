# 📦 Installation Guide - Sleep Oracle

## Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+ and npm
- Git

---

## Backend Setup

### 1. Create Virtual Environment
```bash
python -m venv venv

# On Windows:
venv\Scripts\activate

# On macOS/Linux:
source venv/bin/activate
```

### 2. Install Python Dependencies
```bash
pip install -r requirements.txt
```

### 3. Run Flask Backend
```bash
cd app
python app.py
```

Backend will be available at `http://localhost:5000`

---

## Frontend Setup

### 1. Install Node Dependencies
```bash
cd frontend
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Frontend will be available at `http://localhost:5173`

---

## Testing the Application

1. Open `http://localhost:5173` in your browser
2. Fill in the prediction form with your health data
3. Click "Predict" to see the sleep disorder prediction
4. View recommendations based on your results

---

## Building for Production

### Frontend Build
```bash
cd frontend
npm run build
```

Built files will be in `frontend/dist/`

---

## Retraining the Model

If you have new training data:

```bash
# Place your dataset in dataset/Sleep_health_and_lifestyle_dataset.csv
python retrain_model.py
```

This will:
1. Load and preprocess the data
2. Train a new Random Forest model
3. Save the model to `app/model.pkl`
4. Save encoders to `app/encoders.pkl`

---

## Troubleshooting

### Python Issues
- **Module not found**: Make sure virtual environment is activated
- **pickle error**: Ensure Python version is 3.8+

### Node Issues
- **npm install fails**: Clear cache with `npm cache clean --force`
- **Port in use**: Kill the process on port 5173 or 5000

### CORS Errors
- Backend has CORS enabled
- Make sure frontend and backend are communicating on correct ports

---

## File Structure

```
Sleep-Oracle/
├── app/
│   ├── app.py              # Flask backend
│   ├── model.pkl           # ML model
│   ├── encoders.pkl        # Label encoders
│   └── templates/          # Deprecated
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── components/
│   ├── package.json
│   └── vite.config.js
├── dataset/                # Training data
├── notebooks/              # Jupyter notebooks
├── docs/                   # Documentation
├── requirements.txt        # Python dependencies
└── retrain_model.py        # Model retraining
```

---

## Next Steps

- Read [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment
- Check [README.md](README.md) for project overview
- Explore notebooks for model details
- Review docs folder for project phases
