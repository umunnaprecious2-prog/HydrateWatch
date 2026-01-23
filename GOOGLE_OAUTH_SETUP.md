# Google OAuth Setup Guide

This guide walks you through setting up Google OAuth authentication for HydrateWatch.

## Prerequisites

- Google account
- HydrateWatch backend and frontend installed

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top
3. Click "New Project"
4. Enter project name: `HydrateWatch`
5. Click "Create"

## Step 2: Enable Google+ API

1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google+ API"
3. Click on it and click "Enable"

## Step 3: Configure OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Select "External" user type
3. Click "Create"
4. Fill in the required fields:
   - **App name**: HydrateWatch
   - **User support email**: Your email
   - **Developer contact information**: Your email
5. Click "Save and Continue"
6. On the "Scopes" page, click "Add or Remove Scopes"
7. Add these scopes:
   - `openid`
   - `email`
   - `profile`
8. Click "Save and Continue"
9. On "Test users" page, add your test email addresses (optional for testing)
10. Click "Save and Continue"
11. Review and click "Back to Dashboard"

## Step 4: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Select "Web application"
4. Fill in the details:
   - **Name**: HydrateWatch Web Client
   - **Authorized JavaScript origins**:
     - `http://localhost:3000`
     - `http://127.0.0.1:3000`
   - **Authorized redirect URIs**:
     - `http://localhost:3000`
     - `http://localhost:3000/login`
     - `http://localhost:3000/register`
5. Click "Create"
6. **IMPORTANT**: Copy the Client ID and Client Secret - you'll need these!

## Step 5: Configure Backend Environment

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create or edit the `.env` file:
```bash
cp .env.example .env
```

3. Add your Google OAuth credentials to `.env`:
```
DATABASE_URL=sqlite:///./hydratewatch.db
SECRET_KEY=your-secret-key-here-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Google OAuth Configuration
GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_HERE.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=YOUR_CLIENT_SECRET_HERE
```

Replace `YOUR_CLIENT_ID_HERE` and `YOUR_CLIENT_SECRET_HERE` with the credentials from Step 4.

## Step 6: Configure Frontend Environment

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Edit the `.env.local` file:
```bash
# If it doesn't exist
cp .env.example .env.local
```

3. Add your Google Client ID to `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000

# Google OAuth Configuration
NEXT_PUBLIC_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_HERE.apps.googleusercontent.com
```

Replace `YOUR_CLIENT_ID_HERE` with the Client ID from Step 4.

## Step 7: Install Dependencies

### Backend

```bash
cd backend
pip install -r requirements.txt
```

This will install the new Google OAuth packages:
- `google-auth`
- `google-auth-oauthlib`
- `google-auth-httplib2`

### Frontend

```bash
cd frontend
npm install
```

This will install:
- `@react-oauth/google`

## Step 8: Restart Servers

### Backend

```bash
cd backend
# Make sure virtual environment is activated
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm run dev
```

## Step 9: Test Google OAuth

1. Open your browser to `http://localhost:3000/login`
2. Click the "Sign in with Google" button
3. Select your Google account
4. Grant permissions
5. You should be redirected to the dashboard

## Troubleshooting

### Error: "redirect_uri_mismatch"

**Solution**: Make sure your redirect URIs in Google Cloud Console match exactly:
- `http://localhost:3000`
- No trailing slashes
- Correct port number

### Error: "invalid_client"

**Solution**:
- Check that `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are correctly set in `.env`
- Make sure there are no extra spaces or quotes
- Restart the backend server after changing `.env`

### Error: "idpiframe_initialization_failed"

**Solution**:
- Check that `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is set in `.env.local`
- Restart the frontend server after changing `.env.local`
- Clear browser cache and cookies

### Error: "Access blocked: This app's request is invalid"

**Solution**:
- Go to OAuth consent screen in Google Cloud Console
- Make sure the app is in "Testing" mode
- Add your email to "Test users"
- Or publish the app (for production)

### Button doesn't appear

**Solution**:
- Check browser console for errors
- Verify `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is set correctly
- Check that `@react-oauth/google` is installed: `npm list @react-oauth/google`
- Clear browser cache

### CORS errors

**Solution**:
- Verify authorized JavaScript origins in Google Cloud Console
- Make sure backend CORS includes `http://localhost:3000`
- Check that frontend is running on port 3000

## How It Works

### Authentication Flow

1. User clicks "Sign in with Google"
2. Google OAuth popup appears
3. User selects Google account and grants permissions
4. Google returns a credential (JWT token)
5. Frontend sends credential to backend `/api/v1/auth/google` endpoint
6. Backend verifies the Google token with Google's servers
7. Backend checks if user exists:
   - If yes: Return existing user with JWT token
   - If no: Create new user and return with JWT token
8. Frontend stores token and user data in localStorage
9. User is redirected to dashboard

### Security Notes

- Google tokens are verified server-side for security
- Users created via OAuth have random passwords (can't login with password)
- Google user email must be verified by Google
- Backend validates token with Google servers on every OAuth login
- JWT token expires after 30 minutes (configurable)

## Testing with Different Accounts

To test with multiple Google accounts:

1. Add accounts to "Test users" in OAuth consent screen (if in Testing mode)
2. Use browser incognito mode for different accounts
3. Or logout and login with different account

## Production Deployment

Before deploying to production:

1. **Update OAuth consent screen**:
   - Add privacy policy URL
   - Add terms of service URL
   - Submit for verification if needed

2. **Update authorized domains**:
   - Add production domain to authorized JavaScript origins
   - Add production URLs to authorized redirect URIs
   - Example: `https://hydratewatch.example.com`

3. **Update environment variables**:
   - Use production domain in `NEXT_PUBLIC_API_URL`
   - Keep same `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
   - Or create separate credentials for production

4. **Enable HTTPS**:
   - Google OAuth requires HTTPS in production
   - Update CORS settings to use HTTPS

5. **Publish app**:
   - Submit app for verification in OAuth consent screen
   - Or keep in testing mode with limited users

## API Endpoint Reference

### POST /api/v1/auth/google

Authenticate user with Google OAuth token.

**Request:**
```json
{
  "credential": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjI3N..."
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "email": "user@gmail.com",
    "name": "User Name",
    "is_active": true,
    "role": "user"
  }
}
```

**Error Responses:**
- `400 Bad Request`: Email not provided by Google
- `401 Unauthorized`: Invalid Google token
- `500 Internal Server Error`: Server error during authentication

## Support

For issues with:
- **Google OAuth setup**: Check [Google OAuth 2.0 documentation](https://developers.google.com/identity/protocols/oauth2)
- **React OAuth library**: Check [@react-oauth/google docs](https://www.npmjs.com/package/@react-oauth/google)
- **Backend implementation**: Check the code in `backend/app/api/v1/routes/auth.py`
