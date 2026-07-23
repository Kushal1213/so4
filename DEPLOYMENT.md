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
```

---

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
```

---

## 🌟 Support

For issues or questions:
- Check the troubleshooting section above
- Review Render/Vercel documentation
- Check the logs in your deployment dashboard

---

**Happy Deploying! 🚀🌙**