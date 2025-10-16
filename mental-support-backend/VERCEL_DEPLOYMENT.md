# Vercel Deployment Guide for Mental Support Backend

This guide will help you deploy your Express.js + MongoDB backend to Vercel.

## ✅ What Was Fixed

Your teammate mixed CommonJS and ES Modules which caused deployment issues. Here's what was corrected:

1. **`api/index.js`**: Changed from ES modules to CommonJS with proper MongoDB connection caching for serverless
2. **`server.js`**: Removed incorrect Vercel-specific logic
3. **`vercel.json`**: Updated to point to the correct entry point (`api/index.js`)
4. **`package.json`**: Fixed scripts for cross-platform compatibility
5. **`utils/db.js`**: Removed unused ES module file

## 🚀 Deployment Steps

### 1. Prerequisites

- A Vercel account (sign up at https://vercel.com)
- MongoDB Atlas database (or any MongoDB instance accessible online)
- Vercel CLI installed (optional but recommended)

Install Vercel CLI globally:
```bash
npm install -g vercel
```

### 2. Prepare Your Environment Variables

You'll need to set these environment variables in Vercel:

**Required:**
- `MONGODB_URI` - Your MongoDB connection string (e.g., from MongoDB Atlas)
- `JWT_SECRET` - A secure random string for JWT tokens
- `FRONTEND_URL` - Your frontend URL (e.g., https://your-app.vercel.app)

**Optional (if using email features):**
- `EMAIL_SERVICE` - Email service provider (e.g., gmail)
- `EMAIL_USER` - Your email address
- `EMAIL_PASSWORD` - Your email app password

**Optional (if using Google Calendar):**
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REDIRECT_URI`
- `GOOGLE_REFRESH_TOKEN`
- `DEFAULT_COUNSELOR_EMAIL`

### 3. Deploy via Vercel CLI (Recommended)

**Step 1:** Login to Vercel
```bash
vercel login
```

**Step 2:** Navigate to your project directory (you're already here)
```bash
cd "D:\deskstop new\mental health\mental-support-backend"
```

**Step 3:** Deploy to Vercel
```bash
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Choose your account
- Link to existing project? **N** (first time) or **Y** (if updating)
- What's your project's name? `mental-support-backend`
- In which directory is your code located? `./`

**Step 4:** Add environment variables
```bash
vercel env add MONGODB_URI
```
When prompted, paste your MongoDB URI and select all environments (production, preview, development).

Repeat for all required variables:
```bash
vercel env add JWT_SECRET
vercel env add FRONTEND_URL
# Add others as needed
```

**Step 5:** Deploy to production
```bash
vercel --prod
```

### 4. Deploy via Vercel Dashboard (Alternative)

**Step 1:** Push your code to GitHub/GitLab/Bitbucket

**Step 2:** Go to [Vercel Dashboard](https://vercel.com/dashboard)

**Step 3:** Click "Add New Project"

**Step 4:** Import your repository

**Step 5:** Configure your project:
- **Framework Preset**: Other
- **Root Directory**: `./`
- **Build Command**: Leave empty (not needed)
- **Output Directory**: Leave empty
- **Install Command**: `npm install`

**Step 6:** Add Environment Variables
Click "Environment Variables" and add:
```
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/mental-support
JWT_SECRET = your-super-secret-jwt-key
FRONTEND_URL = https://your-frontend.vercel.app
EMAIL_SERVICE = gmail
EMAIL_USER = your-email@gmail.com
EMAIL_PASSWORD = your-app-password
```

**Step 7:** Click "Deploy"

### 5. MongoDB Atlas Setup (if needed)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist Vercel IP addresses (or use 0.0.0.0/0 for all IPs)
5. Get your connection string from "Connect" → "Connect your application"
6. Replace `<password>` with your database user password

Example connection string:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/mental-support?retryWrites=true&w=majority
```

### 6. Test Your Deployment

Once deployed, test your API endpoints:

**Health Check:**
```bash
curl https://your-project.vercel.app/api/health
```

**Register Test:**
```bash
curl -X POST https://your-project.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'
```

### 7. Update Frontend URL

After deployment, update your frontend's API endpoint to point to:
```
https://your-project.vercel.app
```

## 🔧 Troubleshooting

### Issue: "Module not found"
- Make sure all dependencies are in `package.json`
- Run `npm install` locally to verify

### Issue: "MongoDB connection failed"
- Check your MONGODB_URI is correct
- Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Check database user has read/write permissions

### Issue: "JWT Secret not defined"
- Verify JWT_SECRET is set in Vercel environment variables
- Redeploy after adding environment variables

### Issue: "CORS errors"
- Make sure FRONTEND_URL environment variable matches your frontend domain
- Check that your frontend is sending credentials correctly

## 📝 Local Development

To run locally after these changes:

```bash
# Install dependencies
npm install

# Create .env file with your environment variables
# (copy from .env.example)

# Run development server
npm run dev
```

Your server will run on http://localhost:5000

## 🔄 Updating Your Deployment

### Via CLI:
```bash
vercel --prod
```

### Via GitHub:
Just push to your main/master branch - Vercel will auto-deploy!

## 📱 API Endpoints

Your API will be available at: `https://your-project.vercel.app/api`

- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- POST `/api/auth/forgot-password` - Request password reset
- POST `/api/auth/reset-password` - Reset password
- GET `/api/user/profile` - Get user profile
- PUT `/api/user/profile` - Update user profile
- POST `/api/booking` - Create booking
- GET `/api/booking` - Get bookings
- POST `/api/support` - Submit support request
- GET `/api/health` - Health check

## 🎉 Success!

Your backend is now deployed on Vercel! Share your API URL with your team.

For more info, visit [Vercel Documentation](https://vercel.com/docs)
