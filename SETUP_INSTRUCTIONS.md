# Setup Instructions - Mental Support Website

## Current Status
✅ Backend structure created
✅ Frontend pages created (Home, Login, Register, Dashboard)
✅ Environment files configured

## MongoDB Setup Required

Since MongoDB is not installed locally, you have two options:

### Option 1: MongoDB Atlas (Cloud - Recommended for Quick Start)

1. **Create Free Account:**
   - Go to https://www.mongodb.com/cloud/atlas/register
   - Sign up for free (no credit card required)

2. **Create Cluster:**
   - Click "Build a Database"
   - Select "FREE" tier (M0)
   - Choose a cloud provider and region close to you
   - Click "Create"

3. **Setup Database Access:**
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Username: `mentaluser` (or your choice)
   - Password: Click "Autogenerate Secure Password" and copy it
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Setup Network Access:**
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

5. **Get Connection String:**
   - Go back to "Database" (Clusters)
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like):
     ```
     mongodb+srv://mentaluser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - Replace `<password>` with your actual password

6. **Update Backend .env:**
   - Open: `mental-support-backend/.env`
   - Replace the MONGODB_URI line with:
     ```
     MONGODB_URI=mongodb+srv://mentaluser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/mental-support?retryWrites=true&w=majority
     ```

### Option 2: Install MongoDB Locally

1. Download MongoDB Community Edition:
   - Windows: https://www.mongodb.com/try/download/community
   - Install and start the MongoDB service

2. Keep the default connection string in `.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/mental-support
   ```

## Running the Application

### Terminal 1 - Backend:
```powershell
cd mental-support-backend
npm run dev
```

Expected output:
```
🚀 Server running on port 5000
✅ MongoDB Connected Successfully
```

### Terminal 2 - Frontend:
```powershell
cd mental-support-frontend
npm run dev
```

Expected output:
```
▲ Next.js 15.x.x
- Local:        http://localhost:3000
```

## Testing the Application

1. **Open Browser:** http://localhost:3000
2. **Create Account:** Click "Get Started" or go to /register
3. **Fill Form:**
   - Name: Test User
   - Email: test@example.com
   - Password: test123
4. **Login** with your credentials
5. **View Dashboard** - You should see welcome message and stats

## Troubleshooting

### Backend won't start:
- **MongoDB Connection Error:** Make sure MongoDB Atlas cluster is active and IP is whitelisted
- **Port 5000 in use:** Change PORT in backend/.env to 5001

### Frontend won't start:
- **Port 3000 in use:** Next.js will automatically suggest port 3001
- **Module not found:** Run `npm install` in frontend directory

### Can't register/login:
- Check backend is running (Terminal 1 should show no errors)
- Check browser console (F12) for errors
- Verify NEXT_PUBLIC_API_URL in frontend/.env.local

## Email Configuration (Optional for now)

For password reset and booking confirmations, configure Gmail:

1. **Enable 2FA on Gmail account**
2. **Generate App Password:**
   - Google Account → Security → 2-Step Verification → App Passwords
   - Select "Mail" and "Other"
   - Copy the 16-character password

3. **Update backend/.env:**
   ```
   EMAIL_USER=your.email@gmail.com
   EMAIL_PASSWORD=your-16-char-app-password
   ```

## Next Steps After Setup

Once both servers are running:

1. ✅ Test homepage with animations
2. ✅ Register a new user
3. ✅ Login and view dashboard
4. 📝 Create booking page
5. 📝 Create resources/FAQ page
6. 📝 Create contact form

## Quick Commands

**Reset everything:**
```powershell
# Delete node_modules and reinstall
Remove-Item -Recurse -Force mental-support-backend/node_modules
Remove-Item -Recurse -Force mental-support-frontend/node_modules
cd mental-support-backend && npm install
cd ../mental-support-frontend && npm install
```

**Check if servers are running:**
```powershell
# Backend
curl http://localhost:5000/api/health

# Frontend
# Just open http://localhost:3000 in browser
```

---

Need help? Check README.md for full documentation!
