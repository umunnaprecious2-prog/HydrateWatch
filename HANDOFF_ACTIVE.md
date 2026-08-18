# HyrateWatch Session Handoff

**Purpose:** Track session state between Claude conversations to ensure continuity and prevent lost context.

---

## Current Status

**Last Updated:** 2026-08-18
**Session State:** Active - repo prepped for Render + CockroachDB deploy, awaiting the user to click through the dashboards
**Branch:** main

---

## Last Completed Work

- Removed the legacy Python/FastAPI/SQLAlchemy backend (`backend/app`,
  `alembic/`, `requirements.txt`, venvs) - it's fully superseded now.
- Backend is TypeScript + Express + Prisma, running against **CockroachDB**
  as the actual database host. Prisma's `datasource` uses
  `provider = "postgresql"` though, not `"cockroachdb"` - CockroachDB is
  Postgres-wire-compatible and accepts standard Postgres DDL, and the
  user's other app already uses this same pattern successfully. (We
  briefly went down the `provider = "cockroachdb"` path - sequence()
  instead of autoincrement(), STRING/INT4 SQL - then reverted to plain
  postgresql once that was clarified. The current migration is plain
  Postgres DDL: SERIAL/TEXT/DOUBLE PRECISION.)
- Wired up ESLint + Prettier for the backend (`npm run lint` / `format`)
  and fixed the lint errors that surfaced.
- Dockerized backend + frontend: `backend/Dockerfile`,
  `frontend/Dockerfile`, root `docker-compose.yml`. Verified the full
  stack end to end against a local Postgres before the CockroachDB
  switch (backend applied migrations, `/api/v1/health` returned 200,
  frontend served 200) - fixed three real Docker bugs along the way:
  Prisma's telemetry hanging with no outbound network, Prisma's engine
  needing OpenSSL on `node:20-alpine`, and Next's standalone server
  binding to Docker's auto-set `HOSTNAME` instead of all interfaces.
- **Not yet verified against a real CockroachDB cluster**: a local
  CockroachDB container repeatedly failed to boot in this sandboxed
  session (`start-single-node` timing out on its own internal self-check
  - looked like a resource/timing issue specific to this environment,
  not a code problem). Docker Compose's `db` service was removed rather
  than switched to a flaky local CockroachDB container - `DATABASE_URL`
  now just points at a real CockroachDB cluster (Cloud Serverless free
  tier works for local dev too). The migration is plain Postgres DDL,
  which CockroachDB's compatibility layer should handle fine, but
  **first real run will be whenever the user points a live cluster's
  connection string at this** - watch for surprises then.
- Added `render.yaml` (Render Blueprint: Docker backend + Node frontend)
  and a "Deploy to production" section in README.md. Field names are
  correct as of when this was written but unverified against Render's
  live parser (no Render API key available this session) - if the
  Blueprint import fails on a field, the dashboard's manual "New Web
  Service" flow is the fallback (documented in README.md).
- Added `FRONTEND_URL` env var (backend CORS) and tightened CORS to
  reject unknown origins in production (it previously allowed any
  origin unconditionally, even with `credentials: true`).
- Restored `claude.md` to the full HydrateWatch operating rules (a
  stray generic template had overwritten it); removed the leftover
  `claudee.md`, `prep.md`, `instruction.md` scaffolding.
- Shipped a small frontend fix: sensor data now refetches immediately
  after a successful upload instead of waiting for the next poll.

---

## Next Steps / Pending Tasks

- [ ] User: create a CockroachDB Cloud Serverless cluster, get the
      connection string (README.md has the exact steps).
- [ ] User: Render dashboard -> New -> Blueprint -> connect this repo,
      fill in the prompted env vars, deploy, then cross-wire
      `FRONTEND_URL` / `NEXT_PUBLIC_API_URL` once both services have a
      live URL (see README.md "Deploy to production").
- [ ] Once a real CockroachDB cluster is reachable, run
      `npm run prisma:migrate` (or let the backend's Docker start
      command run `prisma migrate deploy`) and watch for any
      CockroachDB-specific errors the offline-generated migration
      didn't catch.
- [ ] Point real Google OAuth credentials at `backend/.env` / root
      `.env` if Google sign-in needs to work locally (placeholders
      only right now).
- [ ] Consider adding a CI workflow (lint + build) now that ESLint/tsc
      are wired up.

---

## Known Issues

| Issue | Status | Notes |
|-------|--------|-------|
| Local CockroachDB-in-Docker failed to boot in this session | Open, likely environment-specific | See "Last Completed Work". Try again on a less resource-constrained machine, or just use CockroachDB Cloud for local dev too (recommended anyway). |
| render.yaml unverified against Render's live Blueprint parser | Open | No Render API key this session. Manual dashboard flow is the fallback if import fails. |

---

## Environment State

### Docker Compose
Needs `DATABASE_URL` in root `.env` pointed at a real CockroachDB cluster first (no bundled local db service anymore - see README.md).

```powershell
docker compose up -d --build
```

- Backend: http://localhost:8000 (health: `/api/v1/health`)
- Frontend: http://localhost:3000

### Running without Docker
```powershell
cd backend
npm install
npm run prisma:generate
npm run prisma:migrate   # needs DATABASE_URL pointed at a real CockroachDB cluster
npm run dev              # http://localhost:8000

cd frontend
npm install
npm run dev               # http://localhost:3000
```

### Production
Not yet deployed. `render.yaml` + README.md "Deploy to production" cover the steps; needs the user to click through the Render/CockroachDB dashboards (account-level actions Claude can't do on their behalf).

---

## Important Notes for Next Session

1. Always read this file at session start
2. Update this file before ending a session
3. Check Git status before making changes
4. The backend is TypeScript/Express/Prisma/**CockroachDB** now - not
   plain PostgreSQL, and not the old Python backend.
5. If picking this up again: check whether the user has actually
   deployed yet (ask, or check for a live Render URL) before assuming
   the "Next Steps" above are still pending.

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
