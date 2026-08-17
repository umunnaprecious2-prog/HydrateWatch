# HydrateWatch

Hydrate sensor monitoring app: risk predictions, sensor data upload/history,
and an AI knowledge feed, behind email/password + Google OAuth auth.

**Stack:** TypeScript + Express + Prisma on PostgreSQL (backend), Next.js +
React + Tailwind (frontend), Docker Compose for local orchestration.

## Run it with Docker (recommended)

```bash
cp .env.example .env   # fill in real values, especially SECRET_KEY
docker compose up -d --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:8000 (health: `/api/v1/health`)
- Postgres: localhost:5432

The `db` service can take a couple of minutes on its very first boot while
Postgres initializes its data volume; `backend` waits for it to report
healthy before starting, and applies Prisma migrations automatically.

```bash
docker compose logs -f backend   # tail logs
docker compose down              # stop everything (add -v to also wipe the db volume)
```

## Run it locally without Docker

Needs a reachable PostgreSQL instance (`docker compose up -d db` works fine
for just the database).

```bash
cd backend
npm install
cp .env.example .env      # point DATABASE_URL at your Postgres
npm run prisma:migrate
npm run seed               # optional: creates a test user + default feed sources
npm run dev                 # http://localhost:8000
```

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev                 # http://localhost:3000
```

## Project structure

```
backend/    Express API - controllers/repositories/services/routes, Prisma schema + migrations
frontend/   Next.js app (App Router)
docker-compose.yml   db + backend + frontend
```

## More docs

- [AUTHENTICATION_GUIDE.md](AUTHENTICATION_GUIDE.md) - test credentials, auth API reference, troubleshooting
- [GOOGLE_OAUTH_SETUP.md](GOOGLE_OAUTH_SETUP.md) - configuring Google sign-in
- [claude.md](claude.md) - operating rules for AI-assisted work on this repo
- [HANDOFF_ACTIVE.md](HANDOFF_ACTIVE.md) - current session state / handoff notes
