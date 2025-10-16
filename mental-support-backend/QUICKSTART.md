# 🚀 Quick Start - Deploy to Vercel in 5 Minutes

## What Was Fixed? ✅
Your teammate mixed JavaScript module systems (CommonJS and ES Modules). Everything is now fixed and ready to deploy!

## Deploy Now! (Choose One Method)

### Method 1: Using Vercel CLI (Fastest)

```powershell
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy (from this directory)
vercel

# 4. Add your environment variables
vercel env add MONGODB_URI
vercel env add JWT_SECRET  
vercel env add FRONTEND_URL

# 5. Deploy to production
vercel --prod
```

### Method 2: Using GitHub + Vercel Dashboard

```powershell
# 1. Initialize git (if not already done)
git init
git add .
git commit -m "Fix Vercel deployment issues"

# 2. Create a new repo on GitHub and push
git remote add origin https://github.com/YOUR_USERNAME/mental-support-backend.git
git branch -M main
git push -u origin main

# 3. Go to https://vercel.com/dashboard
# 4. Click "Add New Project"
# 5. Import your GitHub repository
# 6. Add environment variables (see below)
# 7. Click "Deploy"
```

## Required Environment Variables

Add these in Vercel (Dashboard → Settings → Environment Variables):

| Variable | Example Value | Where to Get It |
|----------|--------------|-----------------|
| `MONGODB_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/mental-support` | MongoDB Atlas connection string |
| `JWT_SECRET` | `super-secret-random-string-12345` | Generate a random string (keep it secret!) |
| `FRONTEND_URL` | `https://your-frontend.vercel.app` | Your Next.js frontend URL |

### Optional (if using email features):
- `EMAIL_SERVICE` = `gmail`
- `EMAIL_USER` = your email
- `EMAIL_PASSWORD` = your app password

### Optional (if using Google Calendar):
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`  
- `GOOGLE_REDIRECT_URI`
- `GOOGLE_REFRESH_TOKEN`
- `DEFAULT_COUNSELOR_EMAIL`

## MongoDB Setup (if needed)

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a FREE cluster
3. Create database user (Database Access → Add New User)
4. Allow all IPs (Network Access → Add IP → 0.0.0.0/0)
5. Get connection string (Connect → Connect your application)
6. Copy the connection string and use it as `MONGODB_URI`

## Test Your API

Once deployed, test it:

```powershell
# Replace YOUR_URL with your actual Vercel URL
$url = "https://your-project.vercel.app"

# Test health endpoint
curl "$url/api/health"

# Test registration
curl -X POST "$url/api/auth/register" `
  -H "Content-Type: application/json" `
  -d '{"name":"Test User","email":"test@test.com","password":"test123"}'
```

## Your API Endpoints

All endpoints will be at: `https://your-project.vercel.app/api/`

- ✅ `/api/health` - Health check
- ✅ `/api/auth/register` - User registration
- ✅ `/api/auth/login` - User login
- ✅ `/api/auth/forgot-password` - Password reset request
- ✅ `/api/user/profile` - User profile
- ✅ `/api/booking` - Booking management
- ✅ `/api/support` - Support requests

## Need More Details?

📖 Read `VERCEL_DEPLOYMENT.md` for complete documentation
📝 Check `CHANGES.md` to see what was fixed

## Common Issues

**"Module not found" error?**
→ Run `npm install` and try again

**"MongoDB connection failed"?**  
→ Check your MONGODB_URI and MongoDB Atlas IP whitelist

**CORS errors?**
→ Make sure FRONTEND_URL matches your actual frontend URL

**Local testing?**
```powershell
npm run dev
```

## 🎉 That's It!

You're ready to deploy! Choose a method above and get started.

Need help? Check the troubleshooting section in `VERCEL_DEPLOYMENT.md`
