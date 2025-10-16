# Mental Support Backend API 🧠💚

Backend API for the Mental Support Counseling Platform built with Express.js, MongoDB, and Node.js.

## 🎯 Status: Ready for Deployment ✅

All Vercel deployment issues have been fixed! Your backend is now ready to deploy.

## 📚 Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Deploy to Vercel in 5 minutes
- **[VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)** - Complete deployment guide
- **[CHANGES.md](CHANGES.md)** - What was fixed and why

## 🚀 Quick Deploy

```powershell
# Install Vercel CLI
npm install -g vercel

# Login and deploy
vercel login
vercel

# Add environment variables
vercel env add MONGODB_URI
vercel env add JWT_SECRET
vercel env add FRONTEND_URL

# Deploy to production
vercel --prod
```

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5
- **Database**: MongoDB (with Mongoose)
- **Authentication**: JWT + bcryptjs
- **Email**: Nodemailer
- **Calendar**: Google Calendar API
- **Security**: Helmet, CORS, Rate Limiting
- **Validation**: Express Validator

## 📦 Features

- ✅ User authentication (register, login, password reset)
- ✅ User profile management
- ✅ Booking system for counseling sessions
- ✅ Support request management
- ✅ Email notifications
- ✅ Google Calendar integration
- ✅ JWT-based authorization
- ✅ Rate limiting & security headers
- ✅ Input validation

## 🔧 Local Development

```powershell
# Install dependencies
npm install

# Copy environment variables
copy .env.example .env

# Edit .env with your values

# Run development server
npm run dev

# Server runs on http://localhost:5000
```

## 📋 Environment Variables

### Required
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `FRONTEND_URL` - Your frontend application URL

### Optional
- `PORT` - Server port (default: 5000)
- `EMAIL_SERVICE` - Email service provider
- `EMAIL_USER` - Email account username
- `EMAIL_PASSWORD` - Email account password
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `GOOGLE_REDIRECT_URI` - Google OAuth redirect URI
- `GOOGLE_REFRESH_TOKEN` - Google OAuth refresh token
- `DEFAULT_COUNSELOR_EMAIL` - Default counselor email

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token

### User
- `GET /api/user/profile` - Get user profile (protected)
- `PUT /api/user/profile` - Update user profile (protected)

### Booking
- `POST /api/booking` - Create new booking (protected)
- `GET /api/booking` - Get user bookings (protected)
- `GET /api/booking/:id` - Get booking by ID (protected)
- `PUT /api/booking/:id` - Update booking (protected)
- `DELETE /api/booking/:id` - Cancel booking (protected)

### Support
- `POST /api/support` - Submit support request
- `GET /api/support` - Get support requests (protected)

### Health
- `GET /api/health` - API health check

## 📁 Project Structure

```
mental-support-backend/
├── api/
│   └── index.js          # Vercel serverless entry point
├── middleware/
│   └── auth.js           # JWT authentication middleware
├── models/
│   ├── Booking.js        # Booking model
│   ├── SupportRequest.js # Support request model
│   └── User.js           # User model
├── routes/
│   ├── auth.js           # Authentication routes
│   ├── booking.js        # Booking routes
│   ├── support.js        # Support routes
│   └── user.js           # User routes
├── utils/
│   ├── apiResponse.js    # API response helpers
│   ├── emailService.js   # Email sending utility
│   └── googleCalendar.js # Google Calendar integration
├── .env.example          # Environment variables template
├── package.json          # Dependencies
├── server.js             # Express app configuration
└── vercel.json           # Vercel deployment config
```

## 🔐 Security Features

- Password hashing with bcryptjs
- JWT token authentication
- HTTP security headers with Helmet
- CORS protection
- Rate limiting (100 requests per 15 minutes)
- Input validation and sanitization
- MongoDB injection prevention

## 🧪 Testing

Test your deployed API:

```powershell
# Health check
curl https://your-app.vercel.app/api/health

# Register test user
curl -X POST https://your-app.vercel.app/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{"name":"Test","email":"test@test.com","password":"test123"}'
```

## 🐛 Troubleshooting

**Local server won't start?**
- Check your `.env` file has all required variables
- Verify MongoDB is running (if using local MongoDB)
- Run `npm install` to ensure all dependencies are installed

**Deployment fails?**
- Verify all environment variables are set in Vercel
- Check MongoDB Atlas allows connections from 0.0.0.0/0
- Review Vercel deployment logs for specific errors

**MongoDB connection issues?**
- Ensure MongoDB URI is correct
- Check network access settings in MongoDB Atlas
- Verify database user has proper permissions

## 📝 What Was Fixed?

Your teammate mixed CommonJS (`require`) and ES Modules (`import`), which caused deployment failures. All issues have been resolved:

1. ✅ Converted `api/index.js` to CommonJS
2. ✅ Added proper MongoDB connection caching for serverless
3. ✅ Fixed `server.js` initialization logic
4. ✅ Updated `vercel.json` configuration
5. ✅ Fixed cross-platform compatibility in `package.json`
6. ✅ Removed unused ES module files

See [CHANGES.md](CHANGES.md) for detailed information.

## 🤝 Contributing

This is a team project for a mental health support platform. To contribute:

1. Make changes in your local branch
2. Test locally with `npm run dev`
3. Push to GitHub (auto-deploys to Vercel preview)
4. Merge to main for production deployment

## 📄 License

ISC

## 👥 Team

Built with ❤️ by your team for mental health support.

---

**Ready to deploy?** Start with [QUICKSTART.md](QUICKSTART.md)

**Need help?** Check [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) for detailed instructions.
