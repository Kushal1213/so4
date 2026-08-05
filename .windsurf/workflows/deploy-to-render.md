---
description: Deploy Sleep Oracle to Render free tier
---

# Deploy Sleep Oracle to Render

This workflow will guide you through deploying the Sleep Oracle application to Render's free tier.

## Prerequisites

- GitHub account with this repository pushed
- Render account (free at render.com)

## Step 1: Push Code to GitHub

Ensure your code is pushed to GitHub:
```bash
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

## Step 2: Deploy Backend to Render

1. Go to [render.com](https://render.com) and sign up/login with GitHub
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Configure the backend service:
   - **Name**: `sleep-oracle-backend`
   - **Root Directory**: `.` (root of project)
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app.app:app`
   - **Environment**: Python 3
5. Click **Create Web Service**
6. Wait for deployment (2-3 minutes)
7. Copy the backend URL (e.g., `https://sleep-oracle-backend.onrender.com`)

## Step 3: Update Frontend API URL

1. Edit `frontend/src/App.jsx`
2. Find the axios.post line and replace `http://localhost:5000/predict` with your Render backend URL
3. Commit and push:
```bash
git add frontend/src/App.jsx
git commit -m "Update API URL for production"
git push origin main
```

## Step 4: Deploy Frontend to Render

1. In Render, click **New +** → **Web Service**
2. Connect the same GitHub repository
3. Configure the frontend service:
   - **Name**: `sleep-oracle-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run preview`
   - **Environment**: Node
4. Click **Create Web Service**
5. Wait for deployment (2-3 minutes)

## Step 5: Access Your Application

Open the frontend URL provided by Render. Your Sleep Oracle is now live! 🎉

## Troubleshooting

- **Backend fails to start**: Check Render logs for errors
- **Frontend can't connect to backend**: Verify the API URL in App.jsx
- **Build timeout**: Free tier has limits, but this app is lightweight
- **Cold starts**: Free tier may take 30-60s to wake up

## Monitoring

- Use Render dashboard to monitor logs and performance
- Backend has `/health` endpoint for health checks
