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
```

---

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
```

---

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
