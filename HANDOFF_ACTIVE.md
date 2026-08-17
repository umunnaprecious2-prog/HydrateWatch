# HyrateWatch Session Handoff

**Purpose:** Track session state between Claude conversations to ensure continuity and prevent lost context.

---

## Current Status

**Last Updated:** 2026-08-17
**Session State:** Active - stack dockerized and verified working
**Branch:** main

---

## Last Completed Work

- Removed the legacy Python/FastAPI/SQLAlchemy backend (`backend/app`,
  `alembic/`, `requirements.txt`, venvs) - it's fully superseded now.
- Backend is TypeScript + Express + Prisma, targeting **PostgreSQL**
  (was SQLite). Initial migration generated and applied against a real
  Postgres instance (`backend/prisma/migrations/20260817153944_init`).
- Wired up ESLint + Prettier for the backend (`npm run lint` / `format`)
  and fixed the lint errors that surfaced.
- Dockerized everything: `backend/Dockerfile`, `frontend/Dockerfile`,
  root `docker-compose.yml` (db + backend + frontend). Verified end to
  end with `docker compose up` - Postgres comes up healthy, the
  backend applies the Prisma migration and serves `/api/v1/health`
  with a 200, and the frontend Next.js server starts.
- Restored `claude.md` to the full HydrateWatch operating rules (a
  stray generic template had overwritten it); removed the leftover
  `claudee.md`, `prep.md`, `instruction.md` scaffolding.
- Shipped a small frontend fix: sensor data now refetches immediately
  after a successful upload instead of waiting for the next poll.

---

## Next Steps / Pending Tasks

- [ ] Point real Google OAuth credentials at `backend/.env` / root
      `.env` if Google sign-in needs to work locally (placeholders
      only right now).
- [ ] Consider adding a CI workflow (lint + build) now that ESLint/tsc
      are wired up.

---

## Known Issues

| Issue | Status | Notes |
|-------|--------|-------|
| None currently tracked | - | - |

---

## Environment State

### Docker Compose (recommended)
Run everything - Postgres, backend, frontend - with:

```powershell
docker compose up -d --build
```

- Backend: http://localhost:8000 (health: `/api/v1/health`)
- Frontend: http://localhost:3000
- Postgres: localhost:5432 (see root `.env` / `.env.example` for creds)

First boot of the `db` service can take a couple of minutes while
Postgres runs `initdb` inside the named volume - `docker compose ps`
will show it as `(health: starting)` until it's ready; `backend`
won't start until it reports healthy.

### Running without Docker
```powershell
cd backend
npm install
npm run prisma:generate
npm run prisma:migrate   # needs a reachable Postgres, see backend/.env
npm run dev              # http://localhost:8000

cd frontend
npm install
npm run dev               # http://localhost:3000
```

---

## Important Notes for Next Session

1. Always read this file at session start
2. Update this file before ending a session
3. Check Git status before making changes
4. The backend is TypeScript/Express/Prisma/PostgreSQL now - there is
   no Python backend left in this repo.

---

## Quick Reference

### Docker (whole stack):
```powershell
docker compose up -d --build
docker compose logs -f backend
docker compose down
```

### Backend (local):
```powershell
cd backend
npm run dev
```

### Frontend (local):
```powershell
cd frontend
npm run dev
```

### Check Git Status:
```powershell
git status
git ls-tree -r main --name-only
```

---

*This file is referenced by claude.md Section 5*
