# 🤖 Claude Operating Rules for All Projects

**Owner:** Precious Umunna
**Purpose:** Prevent repeat mistakes, enforce clean Git + Windows workflows, and ensure Claude always works safely and professionally on this system.

---

## 1. CORE PRINCIPLES (ALWAYS FOLLOW)

* Treat this file as **authoritative project policy**.
* Read this file at the start of every session.
* If a new problem occurs, **update this file with a new rule**.
* Never repeat a mistake that is documented here.

---

## 2. GIT RULES (CRITICAL — LEARNED FROM EXPERIENCE)

### 2.1 NO NESTED GIT REPOSITORIES

❌ Never allow folders like `backend/` or `frontend/` to contain their own `.git` folder.

ALWAYS:

* Check for nested repos:

  ```bash
  dir -Force
  ```
* If `.git` exists inside a subfolder, REMOVE IT:

  ```bash
  Remove-Item -Recurse -Force .git
  ```

Claude MUST:

* Assume nested Git repos cause submodule issues on Windows.
* Proactively check and prevent this.

---

### 2.2 DATABASE FILES MUST NEVER BE IN GIT

❌ Never track runtime databases:

* `*.db`
* `*.sqlite`
* `*.sqlite3`

ALWAYS in `.gitignore`:

```
*.db
*.sqlite
*.sqlite3
```

Reason:

* Windows locks DB files
* Causes rebase failures
* Databases are runtime artifacts

Claude MUST:

* Never add `.db` files
* Always delete and ignore them

---

### 2.3 SECRETS MANAGEMENT (MANDATORY)

❌ NEVER commit:

* `.env`
* API keys
* tokens

✅ Always commit:

* `.env.example`

ALWAYS in `.gitignore`:

```
.env
.env.*
```

Claude MUST:

* Actively scan for secrets before commits
* Remove secrets from Git if detected

---

### 2.4 WINDOWS RESERVED FILE NAMES

❌ Never allow files named:

* `nul`
* `NUL`
* `con`
* `prn`

These break Git on Windows.

Claude MUST:

* Check for and delete invalid Windows filenames

---

### 2.5 REBASE & STASH RULES

If Git shows:

* rebase-merge errors
* unfinished rebase

Claude MUST:

1. Abort safely:

```bash
git rebase --abort
```

2. Stash changes:

```bash
git stash push -m "temp before rebase"
```

3. Pull clean:

```bash
git pull origin main --rebase
```

4. Restore:

```bash
git stash pop
```

Never force push unless explicitly approved.

---

## 3. WINDOWS + POWERHELL TERMINAL RULES

### 3.1 DO NOT COPY PROMPT TEXT

❌ Never copy:

* `PS C:\...>`
* `>>`
* error output

Only type:

* The raw command

Claude MUST:

* Explicitly tell user to type ONLY the command

---

### 3.2 FILE LOCKING (SQLITE, LOGS, RUNNING SERVERS)

If Git cannot unlink a file:

Claude MUST:

1. Stop all running servers
2. Close VS Code
3. Delete file manually
4. Ensure file is in `.gitignore`

---

## 4. PROJECT STRUCTURE POLICY

* Backend and frontend are NORMAL folders
* No Git submodules unless explicitly required
* No duplicated src folders
* No auto-generated folders in Git

Claude MUST:

* Preserve agreed folder structure
* Never invent new folders without approval

---

## 5. HANDOFF + STATE MANAGEMENT (MANDATORY)

This project uses:

* `HANDOFF_ACTIVE.md`

Claude MUST:

* Read HANDOFF_ACTIVE.md at session start
* Update HANDOFF_ACTIVE.md before context compaction
* Use it as the single source of truth

---

## 6. CLAUDE SELF-UPDATING RULE

If ANY new recurring issue happens (Git, Windows, tooling, APIs, workflow):

Claude MUST:

1. Add a new rule to this file
2. Explain why the rule exists
3. Prevent the same issue in future sessions

This file is a **living rulebook**.

---

## 7. CONFIDENCE CHECKS (END OF MAJOR OPERATIONS)

After major Git operations, Claude MUST ask user to run:

```bash
git status
```

and

```bash
git ls-tree -r main --name-only
```

To confirm:

* Backend present
* Frontend present
* No secrets
* No .db files

---

## 8. PROFESSIONAL STANDARD

Claude must behave like a:

* Senior engineer
* Windows-aware
* Git-recovery capable
* Security-conscious assistant

No shortcuts.
No assumptions.
Always verify.

---

## 9. HYDRATEWATCH PROJECT SPECIFICS

### Tech Stack:

* **Backend:** Python 3.x, FastAPI, SQLAlchemy, Alembic
* **Frontend:** Next.js 14, React 18, TailwindCSS
* **Database:** SQLite (development)
* **Package Managers:** pip (backend), npm (frontend)

Claude MUST:

* Use FastAPI patterns for backend endpoints
* Use Next.js App Router conventions for frontend
* Never mix package managers (no yarn if npm is used)

---

## 10. PYTHON / BACKEND RULES

### 10.1 Virtual Environment

Always activate venv before running Python commands:

```powershell
cd backend
.\venv\Scripts\Activate
```

### 10.2 Dependencies

After adding new packages:

```powershell
pip freeze > requirements.txt
```

### 10.3 Never Commit:

* `__pycache__/`
* `*.pyc`
* `venv/` or `.venv/`
* `.pytest_cache/`

Claude MUST:

* Always verify venv is active before pip commands
* Update requirements.txt when adding dependencies

---

## 11. NODE.JS / FRONTEND RULES

### 11.1 Package Manager Consistency

This project uses **npm** (not yarn or pnpm).

### 11.2 Never Commit:

* `node_modules/`
* `.next/`
* `out/`
* `build/`

### 11.3 Lock File

* Always commit `package-lock.json`
* Never delete it manually

Claude MUST:

* Use `npm install` not `npm i` for clarity
* Run `npm install` after pulling changes with new dependencies

---

## 12. DATABASE MIGRATIONS (ALEMBIC)

### Creating Migrations:

```powershell
cd backend
alembic revision --autogenerate -m "description"
```

### Running Migrations:

```powershell
alembic upgrade head
```

Claude MUST:

* Never edit migration files after they're committed
* Always test migrations locally before committing
* Never commit the SQLite database file (hydratewatch.db)

---

## 13. RUNNING THE PROJECT

### Backend:

```powershell
cd backend
.\venv\Scripts\Activate
uvicorn app.main:app --reload --port 8000
```

### Frontend:

```powershell
cd frontend
npm run dev
```

### URLs:

* Backend API: http://localhost:8000
* Frontend: http://localhost:3000
* API Docs: http://localhost:8000/docs

Claude MUST:

* Verify both servers can start before ending a session
* Check for port conflicts if servers fail to start

---

## 14. BRANCH & COMMIT CONVENTIONS

### Branch Naming:

* `feature/description` - new features
* `fix/description` - bug fixes
* `refactor/description` - code refactoring

### Commit Messages:

Use conventional format:

* `feat: add user authentication`
* `fix: resolve login redirect issue`
* `docs: update README with setup instructions`
* `refactor: simplify API response handling`

Claude MUST:

* Write clear, descriptive commit messages
* Keep commits focused on single changes

---

## 15. LAST UPDATED

Update this date whenever a new rule is added:

Date: 2026-01-24
Reason: Added project-specific rules (sections 9-14), created HANDOFF_ACTIVE.md

---

# This file exists to prevent wasted hours and repeated mistakes.

# Claude MUST respect and evolve it over time.

