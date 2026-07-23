# 🚀 Sleep Oracle - Quick Deployment Guide

Deploy Sleep Oracle to Render free tier in minutes.

## Prerequisites
- GitHub account
- Render account (free at [render.com](https://render.com))

## Step 1: Push to GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

## Step 2: Deploy Backend First

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `sleep-oracle-backend`
   - **Runtime**: Python
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn --chdir app app:app`
   - **Root Directory**: `.`
   - **Health Check Path**: `/health`
5. Click **"Create Web Service"**
6. Wait for deployment (2-3 minutes)
7. Copy the backend URL (e.g., `https://sleep-oracle-backend.onrender.com`)

## Step 3: Deploy Frontend

1. Click **"New +"** → **"Web Service"**
2. Connect the same GitHub repository
3. Configure:
   - **Name**: `sleep-oracle-frontend`
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
   - **Root Directory**: `frontend`
4. Add Environment Variable:
   - **Key**: `VITE_API_URL`
   - **Value**: Your backend URL from Step 2
5. Click **"Create Web Service"**
6. Wait for deployment (2-3 minutes)

## Step 4: Access Your App

Open the frontend URL provided by Render to use your app!

## Troubleshooting

### Backend fails to start
- Check that `app/model.pkl` and `app/encoders.pkl` are committed to git
- Verify the start command: `gunicorn --chdir app app:app`
- Check Render logs for specific errors

### Frontend can't connect to backend
- Ensure `VITE_API_URL` environment variable is set correctly
- Backend URL should be the full Render URL (e.g., `https://sleep-oracle-backend.onrender.com`)
- Check backend health at `https://your-backend.onrender.com/health`

### Build timeouts
- Free tier has build time limits
- If timeout occurs, try deploying services separately

## Features
- ✅ AI-powered sleep disorder prediction
- ✅ Beautiful, responsive UI
- ✅ Real-time ML predictions
- ✅ Probability visualization
- ✅ One-click demo data
- ✅ Health recommendations

## Support
- Backend health check: `https://your-backend.onrender.com/health`
- Check Render logs for any issues
