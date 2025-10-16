# Quick Start Guide

## Fast Setup (5 Minutes)

### 1. Setup Backend (Terminal 1)

```powershell
cd mental-support-backend

# Copy environment file
copy .env.example .env

# Install dependencies
npm install

# Start server
npm run dev
```

### 2. Setup Frontend (Terminal 2)

```powershell
cd mental-support-frontend

# Copy environment file
copy .env.local.example .env.local

# Install dependencies  
npm install

# Start development server
npm run dev
```

### 3. Configure Minimum Required Variables

**Backend `.env`:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mental-support
JWT_SECRET=your-random-secret-key-here
FRONTEND_URL=http://localhost:3000
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

**Frontend `.env.local`:**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Install & Start MongoDB

**Windows:**
```powershell
# Download from: https://www.mongodb.com/try/download/community
# Or use MongoDB Atlas (cloud) - free tier available
```

**Mac:**
```bash
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

### 5. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api/health

## Test the Application

### Test Backend
```powershell
# Check if backend is running
curl http://localhost:5000/api/health
```

### Test Frontend
Open browser and navigate to:
- Homepage: http://localhost:3000
- Should see the hero section with animations

## Quick Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Start MongoDB service or use MongoDB Atlas cloud connection string

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: Change PORT in backend `.env` file or kill the process using the port

### GSAP Animation Not Working
**Solution**: Make sure you're using client components with `'use client'` directive

### Email Not Sending
**Solution**: 
1. Enable 2FA on Gmail
2. Generate App Password (not your regular password)
3. Use App Password in EMAIL_PASSWORD

## Next Steps

1. **Create a test user**: Visit http://localhost:3000/register
2. **Explore the homepage**: Check animations and features
3. **Test authentication**: Try login/logout
4. **Build remaining pages**: Follow patterns in README.md

## Need Help?

Check the full README.md for:
- Detailed configuration guides
- API documentation
- Security features
- Page implementation examples

---

**Happy Coding! 💚**
