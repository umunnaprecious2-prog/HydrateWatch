# HydrateWatch Authentication Guide

## Test Credentials

Use these credentials to login to the application:

- **Email**: `test@example.com`
- **Password**: `password123`

## Setting Up the Application

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (if not already created):
```bash
python -m venv venv
```

3. Activate the virtual environment:
- Windows: `venv\Scripts\activate`
- Mac/Linux: `source venv/bin/activate`

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Create `.env` file from example:
```bash
cp .env.example .env
```

6. Seed the database with test data:
```bash
python seed_data.py
```

7. Start the backend server:
```bash
uvicorn app.main:app --reload
```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file from example:
```bash
cp .env.example .env.local
```

4. Verify the `.env.local` contains:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

5. Start the frontend server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## Troubleshooting Authentication Issues

### Issue: Login fails with "Incorrect email or password"

**Solution**: Make sure you're using the correct test credentials:
- Email: `test@example.com`
- Password: `password123` (NOT `test123`)

If still failing, reseed the database:
```bash
cd backend
python seed_data.py
```

### Issue: Registration fails

**Possible causes**:

1. **Email already registered**: Try a different email address
2. **Backend not running**: Verify backend is running at `http://localhost:8000`
3. **CORS error**: Check browser console for CORS errors

**To test the backend directly**:
```bash
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"newuser@test.com","password":"test123"}'
```

### Issue: Google Sign-In doesn't work

**Status**: Google OAuth is now implemented but requires configuration.

**Setup Required**: Before Google OAuth will work, you need to:
1. Create a Google Cloud Project and OAuth credentials
2. Configure environment variables with your Google Client ID and Secret

**Quick Setup**:
See the complete guide: [GOOGLE_OAUTH_SETUP.md](GOOGLE_OAUTH_SETUP.md)

**TL;DR**:
1. Create OAuth credentials at [Google Cloud Console](https://console.cloud.google.com/)
2. Add to `backend/.env`:
   ```
   GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your-client-secret
   ```
3. Add to `frontend/.env.local`:
   ```
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
   ```
4. Install dependencies:
   ```bash
   cd backend && pip install -r requirements.txt
   cd frontend && npm install
   ```
5. Restart both servers

**Current behavior without setup**:
- Google Sign-In button appears but won't work
- You'll see initialization errors in browser console
- You must configure credentials for it to work

### Issue: "Cannot connect to backend"

**Check these**:

1. Backend server is running:
```bash
curl http://localhost:8000
```

Expected response:
```json
{
  "message": "HydrateWatch API",
  "version": "1.0.0",
  "docs": "/docs"
}
```

2. Frontend is configured with correct API URL in `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

3. CORS is properly configured in backend (already configured for localhost:3000)

### Issue: Browser shows CORS error

**Check**: The backend CORS configuration in `backend/app/main.py` includes your frontend URL:
```python
allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"]
```

**Fix**: If using a different port or host, add it to the `allow_origins` list.

### Issue: Token expired or invalid

**Solution**: Tokens expire after 30 minutes by default. Just logout and login again.

To change token expiration, edit `backend/.env`:
```
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## API Endpoints

### Authentication Endpoints

**POST /api/v1/auth/register**
- Creates a new user account
- Request body:
```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "password123"
}
```
- Response: User object with id, email, name, is_active, role

**POST /api/v1/auth/login**
- Authenticates user and returns JWT token
- Content-Type: `application/x-www-form-urlencoded`
- Request body:
```
username=test@example.com&password=password123
```
- Response:
```json
{
  "access_token": "eyJhbGc...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "email": "test@example.com",
    "name": "Test User",
    "is_active": true,
    "role": "user"
  }
}
```

## Testing with cURL

### Test Login
```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=test@example.com&password=password123"
```

### Test Registration
```bash
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"New User","email":"newuser@example.com","password":"newpass123"}'
```

### Test Protected Endpoint
```bash
# First login to get token
TOKEN=$(curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=test@example.com&password=password123" \
  | jq -r '.access_token')

# Then use token to access protected endpoint
curl http://localhost:8000/api/v1/sensors/latest/offshore \
  -H "Authorization: Bearer $TOKEN"
```

## Database Management

### Check existing users
```bash
cd backend
python -c "
from app.database import SessionLocal
from app.models.user import User
db = SessionLocal()
users = db.query(User).all()
for u in users:
    print(f'Email: {u.email}, Name: {u.name}')
"
```

### Reset database (CAUTION: Deletes all data)
```bash
cd backend
rm hydratewatch.db
python seed_data.py
```

## Security Notes

1. The current `SECRET_KEY` in `backend/app/core/config.py` is hardcoded and should be changed for production
2. Tokens are stored in browser localStorage (vulnerable to XSS attacks)
3. No password reset functionality implemented
4. No email verification implemented
5. HTTPS should be used in production
