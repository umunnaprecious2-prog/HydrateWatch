# HydrateWatch - Server Status

## Servers are Running! ✅

Both servers are up and running successfully.

### Backend Server
- **URL**: http://localhost:8000
- **Status**: ✅ Running
- **API Docs**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000

### Frontend Server
- **URL**: http://localhost:3002
- **Status**: ✅ Running
- **Note**: Running on port 3002 (ports 3000 and 3001 were in use)

## Test the Application

### 1. Open the Application
Open your browser and go to:
```
http://localhost:3002
```

### 2. Login with Test Credentials
- **Email**: `test@example.com`
- **Password**: `password123`

### 3. Or Register a New Account
Go to: http://localhost:3002/register

## What's Working

✅ Backend API server running
✅ Frontend web server running
✅ Email/password authentication
✅ User registration
✅ Login functionality
✅ Database connection
✅ All API endpoints

## What's NOT Configured (Optional)

❌ Google OAuth (requires Google Cloud setup - see GOOGLE_OAUTH_SETUP.md)
- The Google Sign-In buttons are hidden since OAuth is not configured
- Email/password login works fine without it

## Common URLs

- **Home Page**: http://localhost:3002
- **Login**: http://localhost:3002/login
- **Register**: http://localhost:3002/register
- **Dashboard**: http://localhost:3002/dashboard (requires login)
- **API Documentation**: http://localhost:8000/docs
- **API Base**: http://localhost:8000/api/v1

## Server Logs

If you need to check server logs:

### Backend logs
```bash
cd backend
tail -f backend.log
```

### Frontend logs
```bash
cd frontend
tail -f frontend.log
```

## Stop Servers

To stop the servers, find and kill the processes:

```bash
# Find the processes
ps aux | grep uvicorn
ps aux | grep next

# Kill them (replace PID with actual process ID)
kill <PID>
```

Or use:
```bash
pkill -f uvicorn
pkill -f "next dev"
```

## Restart Servers

If you need to restart:

### Backend
```bash
cd backend
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm run dev
```

## Troubleshooting

### Port Already in Use

If you see "port in use" errors:
- Frontend will automatically try the next available port (3001, 3002, etc.)
- Backend needs port 8000 - kill any process using it

### Can't Connect to Backend

1. Check backend is running: `curl http://localhost:8000`
2. Check the backend logs for errors
3. Verify `.env` file exists in backend directory

### Login Not Working

1. Make sure you're using the correct credentials:
   - Email: `test@example.com`
   - Password: `password123`
2. Check browser console for errors (F12)
3. Verify backend is accessible

### Google OAuth Errors

This is normal - Google OAuth is not configured. You can:
- Ignore it (email/password works fine)
- Or set it up following GOOGLE_OAUTH_SETUP.md

## Next Steps

1. **Test the application**: Open http://localhost:3002
2. **Login**: Use test@example.com / password123
3. **Explore**: Navigate through the dashboard
4. **Optional**: Set up Google OAuth (see GOOGLE_OAUTH_SETUP.md)

## Need Help?

- **Authentication issues**: See AUTHENTICATION_GUIDE.md
- **Google OAuth setup**: See GOOGLE_OAUTH_SETUP.md
- **General info**: See README.md files in frontend/ and backend/

---

**Status**: All systems operational! 🚀
**Last Updated**: 2026-01-21
