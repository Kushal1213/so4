<<<<<<< HEAD
# Sleep Oracle - Deployment Guide

Complete deployment options for the Sleep Intelligence Platform.

---

## Prerequisites

- Python 3.11+
- Node.js 20+
- Git
- Docker (optional, recommended)

---

## Option 1: Docker (Fastest Local + Production Parity)

### Run full stack

```bash
docker compose up --build
```

- Frontend: http://localhost:4173
- Backend: http://localhost:5000
- Health check: http://localhost:5000/health

### Stop

```bash
docker compose down
```

---

## Option 2: Render Blueprint (Recommended Free Cloud Deploy)

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Sleep Oracle platform ready for deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/sleep-oracle.git
git push -u origin main
```

### Step 2: Deploy with Blueprint

1. Go to [render.com](https://render.com) and sign in with GitHub
2. Click **New +** -> **Blueprint**
3. Connect your repository
4. Render reads `render.yaml` and creates:
   - `sleep-oracle-backend` (Python/Flask API)
   - `sleep-oracle-frontend` (Static React SPA)

### Step 3: Set environment variables

After the first deploy, open each service in Render and set:

**Backend (`sleep-oracle-backend`)**

| Variable | Value |
|----------|-------|
| `FRONTEND_URL` | `https://sleep-oracle-frontend.onrender.com` |

**Frontend (`sleep-oracle-frontend`)**

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | `https://sleep-oracle-backend.onrender.com` |

Then trigger **Manual Deploy** on the frontend so the API URL is baked into the build.

### Step 4: Verify

- Backend health: `https://sleep-oracle-backend.onrender.com/health`
- Frontend app: `https://sleep-oracle-frontend.onrender.com`
- Platform dashboard: `https://sleep-oracle-frontend.onrender.com/app/dashboard`

> Free tier services sleep after inactivity. First request may take 30-60 seconds.

---

## Option 3: Vercel (Frontend) + Render (Backend)

### Backend on Render

Follow Option 2 backend steps only (create a single Python Web Service manually if not using Blueprint).

### Frontend on Vercel

```bash
cd frontend
npm install
vercel
```

Set environment variable in Vercel dashboard:

```
VITE_API_URL=https://your-backend.onrender.com
```

Redeploy after setting the variable.

`frontend/vercel.json` includes SPA rewrites for React Router.

---

## Option 4: Manual Local Production Build

### Backend

```bash
pip install -r requirements.txt
python retrain_model.py
cd app
gunicorn --bind 0.0.0.0:5000 --workers 2 app:app
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your API URL
npm run build
npm run start
=======
# 🚀 Sleep Oracle - Deployment Guide

This guide will help you deploy the Sleep Oracle application to production using **Render** (recommended for free tier) or **Vercel**.

---

## 📋 Prerequisites

- GitHub account with the project pushed to a repository
- Render account (free) or Vercel account (free)
- Basic understanding of git commands

---

## 🎯 Option 1: Deploy to Render (Recommended - Free Tier)

Render offers a generous free tier perfect for this application.

### Step 1: Deploy Backend

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin master
   ```

2. **Create a Render account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

3. **Deploy the Flask Backend**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure the service:
     - **Name**: `sleep-oracle-backend`
     - **Root Directory**: `.` (root of project)
     - **Build Command**: `pip install -r requirements.txt`
     - **Start Command**: `gunicorn app.app:app`
     - **Environment**: Python 3
   - Click "Create Web Service"
   - Wait for deployment (2-3 minutes)
   - Copy the backend URL (e.g., `https://sleep-oracle-backend.onrender.com`)

4. **Update Frontend API URL**
   - Edit `frontend/src/App.jsx`
   - Replace the axios.post URL with your backend URL:
   ```javascript
   const response = await axios.post('https://sleep-oracle-backend.onrender.com/predict', {
   ```

### Step 2: Deploy Frontend

1. **Deploy the React Frontend**
   - In Render, click "New +" → "Web Service"
   - Connect the same GitHub repository
   - Configure the service:
     - **Name**: `sleep-oracle-frontend`
     - **Root Directory**: `frontend`
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm run preview`
     - **Environment**: Node
   - Click "Create Web Service"
   - Wait for deployment (2-3 minutes)

2. **Access your application**
   - Open the frontend URL provided by Render
   - Your Sleep Oracle is now live! 🎉

---

## 🎯 Option 2: Deploy to Vercel (Alternative Free Tier)

### Step 1: Deploy Backend to Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy backend**
   ```bash
   cd /path/to/Sleep-Oracle
   vercel
   ```
   - Follow the prompts
   - Select Python as the framework
   - Set build command: `pip install -r requirements.txt`
   - Set start command: `gunicorn app.app:app`
   - Copy the deployed URL

### Step 2: Deploy Frontend to Vercel

1. **Update API URL in frontend**
   - Edit `frontend/src/App.jsx`
   - Replace with your Vercel backend URL

2. **Deploy frontend**
   ```bash
   cd frontend
   vercel
   ```
   - Follow the prompts
   - Select React/Vite as the framework
   - Your app will be live instantly!

---

## 🔧 Local Development Setup

To run the application locally before deployment:

### Backend Setup

```bash
# Install Python dependencies
pip install -r requirements.txt

# Run Flask backend
cd app
python app.py
```

Backend will run on `http://localhost:5000`

### Frontend Setup

```bash
# Install Node dependencies
cd frontend
npm install

# Run development server
npm run dev
```

Frontend will run on `http://localhost:5173`

---

## 📊 Project Structure

```
Sleep-Oracle/
├── app/                        # Flask backend
│   ├── app.py                  # Flask backend API
│   ├── model.pkl               # Trained ML model
│   ├── encoders.pkl            # Label encoders
│   └── templates/              # Old HTML templates (deprecated)
├── frontend/                   # React frontend with Vite
│   ├── src/
│   │   ├── App.jsx             # Main React component
│   │   ├── components/
│   │   ├── main.jsx
│   │   └── index.css           # Tailwind CSS
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── render.yaml             # Render deployment config
├── dataset/                    # Training data
├── notebooks/                  # Jupyter notebooks
│   ├── Sleep_Oracle_project.ipynb
│   └── Sleep_Oracle_project_Flask.ipynb
├── docs/                       # Phase-wise documentation
│   ├── ideation/
│   ├── planning/
│   ├── design/
│   ├── development/
│   └── final/
├── requirements.txt            # Python dependencies
├── retrain_model.py            # Model retraining script
├── render.yaml                 # Backend Render config
├── vercel.json                 # Vercel config
├── DEPLOYMENT.md               # This file
└── README.md                   # Project README
>>>>>>> d01f353f9618da27ee51f94535596529dcc7629f
```

---

<<<<<<< HEAD
## CI/CD (GitHub Actions)

Every push to `main`/`master` runs:

- Backend: install deps, train model, API smoke test
- Frontend: install deps, production build

Workflow file: `.github/workflows/ci.yml`

---

## Environment Variables

### Backend

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | Auto (Render) | Server port |
| `FRONTEND_URL` | Production | CORS allowed origin(s), comma-separated |

### Frontend

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | Production | Backend API base URL (set before `npm run build`) |
| `PORT` | Auto (Render/Docker) | Static server port |

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| POST | `/predict` | ML screening + scores |
| POST | `/api/dashboard` | Dashboard metrics |
| POST | `/api/coach/daily` | AI coach |
| POST | `/api/analytics` | Analytics bundle |
| POST | `/api/risks` | Risk predictions |
| POST | `/api/chat` | AI assistant |
| GET | `/api/admin/metrics` | Admin metrics |

Full catalog: `/app/api` in the frontend.

---

## Troubleshooting

### CORS errors

Set `FRONTEND_URL` on the backend to your exact frontend URL (with `https://`).

### Frontend shows empty data

1. Confirm backend `/health` returns `"model": "loaded"`
2. Confirm `VITE_API_URL` was set **before** the frontend build
3. Redeploy frontend after updating `VITE_API_URL`

### Model not found on deploy

The Render build runs `python retrain_model.py` automatically. For manual deploys, run it before starting gunicorn.

### React Router 404 on refresh

- Render static: `render.yaml` includes `/* -> /index.html` rewrite
- Vercel: `frontend/vercel.json` includes SPA rewrite
- Docker/local: `serve -s` handles SPA fallback

### Docker build fails on Windows

Ensure Docker Desktop is running and use:

```bash
docker compose up --build
=======
## 🔑 Environment Variables

The application uses the following environment variables (configure in Render/Vercel dashboard):

- `PORT`: Backend port (default: 5000)
- `VITE_API_URL`: Frontend API URL (for production)

---

## 🐛 Troubleshooting

### Backend Issues

- **Model not loading**: Ensure `model.pkl` is in the `app/` directory
- **CORS errors**: Backend has CORS enabled, but verify the frontend URL
- **Port conflicts**: Render automatically assigns ports locally

### Frontend Issues

- **Build fails**: Run `npm install` to ensure all dependencies are installed
- **API connection fails**: Verify the backend URL is correct in `App.jsx`
- **Styles not loading**: Ensure Tailwind CSS is properly configured

### Deployment Issues

- **Build timeout**: Free tier has build time limits, optimize if needed
- **Memory errors**: The model is ~228KB, well within free tier limits
- **Cold starts**: Free tier services may have cold starts (30-60s)

---

## 📈 Monitoring

- **Render Dashboard**: Monitor logs, CPU, and memory usage
- **Vercel Dashboard**: View deployment logs and analytics
- **Health Check**: Backend has a `/health` endpoint for monitoring

---

## 🔒 Security Notes

- The model file (`model.pkl`) should be committed to the repository
- No sensitive data is stored
- API accepts JSON POST requests
- Consider adding rate limiting for production use

---

## 🎨 Features

- **Modern UI**: Beautiful sleep-themed design with animations
- **Real-time predictions**: ML model predicts sleep disorders
- **Responsive design**: Works on mobile and desktop
- **Health recommendations**: Provides personalized tips based on predictions
- **Error handling**: Graceful error messages for users

---

## 📝 API Endpoints

### POST /predict
Predicts sleep disorder based on input features.

**Request Body:**
```json
{
  "gender": 1,
  "age": 30,
  "occupation": 2,
  "sleep_duration": 7.5,
  "quality_of_sleep": 7,
  "physical_activity": 60,
  "stress_level": 5,
  "bmi_category": 0,
  "blood_pressure": 120,
  "heart_rate": 72,
  "daily_steps": 8000
}
```

**Response:**
```json
{
  "prediction": "None",
  "probabilities": {
    "Insomnia": 0.12,
    "No Disorder": 0.78,
    "Sleep Apnea": 0.10
  },
  "status": "success"
}
```

### GET /health
Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "model": "loaded"
}
>>>>>>> d01f353f9618da27ee51f94535596529dcc7629f
```

---

<<<<<<< HEAD
## Architecture

```
React / Vite (frontend)
        |
        v
Flask API Gateway (gunicorn)
        |
   +----+----+
   |         |
ML Model   Sleep Intelligence Services
(Random Forest + scoring engine)
```

---

## Security Notes

- Screening tool only, not medical advice
- No user data persisted by default
- Add rate limiting and auth before public production use
- Keep `model.pkl` generated in CI/build, not hand-edited

---

**Sleep Oracle is ready to deploy.**
=======
## 🌟 Support

For issues or questions:
- Check the troubleshooting section above
- Review Render/Vercel documentation
- Check the logs in your deployment dashboard

---

**Happy Deploying! 🚀🌙**
>>>>>>> d01f353f9618da27ee51f94535596529dcc7629f
