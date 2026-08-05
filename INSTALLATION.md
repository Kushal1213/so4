# Installation Guide - Sleep Oracle

## Prerequisites

- Python 3.11+
- Node.js 20+
- npm
- Git
- Docker Desktop (optional, for containerized deployment)

---

## Quick Start (Local Development)

### 1. Clone and enter project

```bash
git clone https://github.com/YOUR_USERNAME/sleep-oracle.git
cd sleep-oracle
```

### 2. Backend

```bash
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
python retrain_model.py
cd app
python app.py
```

Backend runs at http://localhost:5000

### 3. Frontend (new terminal)

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend runs at http://localhost:5173

---

## Docker (Recommended for Production Parity)

```bash
docker compose up --build
```

- Frontend: http://localhost:4173
- Backend: http://localhost:5000

---

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for Render, Vercel, and CI/CD instructions.

### Pre-deploy validation

```bash
# Windows
powershell -ExecutionPolicy Bypass -File scripts/deploy-prep.ps1

# macOS/Linux
bash scripts/deploy-prep.sh
```

---

## Project Structure

```
sleep-oracle/
├── app/                    # Flask API + ML model
│   ├── app.py
│   ├── services/
│   ├── model.pkl
│   └── encoders.pkl
├── frontend/               # React + Vite platform UI
│   ├── src/pages/          # 22 module pages
│   ├── Dockerfile
│   └── vercel.json
├── dataset/                # Training CSV
├── .github/workflows/      # CI pipeline
├── docker-compose.yml
├── Dockerfile              # Backend image
├── render.yaml             # Render Blueprint
├── retrain_model.py
└── requirements.txt
```

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Model not found | Run `python retrain_model.py` |
| CORS errors | Set `FRONTEND_URL` on backend |
| Empty dashboard | Set `VITE_API_URL` and rebuild frontend |
| Port in use | Change `PORT` or stop conflicting process |

---

For full API documentation, open `/app/api` in the running frontend.
