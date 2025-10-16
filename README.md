# Mental Support Website for Counseling Services

A modern, interactive, and charitable mental support platform where users can register, log in, and book counseling sessions. The website provides mental health support for individuals dealing with depression, anxiety, and other mental health challenges.

## 🌟 Features

### User Features
- **User Authentication**: Secure registration, login, and password recovery
- **Counseling Booking System**: Book Google Meet sessions with professional counselors
- **Email Notifications**: Automatic email confirmations for bookings
- **User Dashboard**: View upcoming sessions, booking history, and personal information
- **Support Request System**: Submit detailed support requests via contact form
- **Resources**: Access mental health articles, tips, and FAQs
- **Responsive Design**: Fully responsive for mobile and desktop

### Technical Features
- **Modern UI/UX**: Calming color scheme with smooth GSAP animations
- **Google Calendar Integration**: Automated meeting scheduling
- **Email Service**: Professional email notifications using Nodemailer
- **Security**: JWT authentication, encrypted passwords, input validation
- **RESTful API**: Well-structured backend with Express.js
- **MongoDB Database**: Efficient data storage and retrieval

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **GSAP** - Animation library for smooth transitions
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Nodemailer** - Email service
- **Google APIs** - Calendar and Meet integration

## 📁 Project Structure

```
├── mental-support-backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Authentication & validation
│   ├── utils/           # Email & calendar utilities
│   └── server.js        # Express server
│
├── mental-support-frontend/
│   ├── app/             # Next.js app directory
│   ├── components/      # React components
│   ├── context/         # Auth context
│   └── lib/             # API utilities
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Gmail account (for email service)
- Google Cloud Console account (for Calendar API)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd mental-support-backend
   ```

2. **Create environment file:**
   ```bash
   copy .env.example .env
   ```

3. **Configure environment variables in `.env`:**
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/mental-support
   JWT_SECRET=your-secret-key-here
   FRONTEND_URL=http://localhost:3000
   
   # Email Configuration
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   
   # Google Calendar API
   GOOGLE_CLIENT_ID=your-client-id
   GOOGLE_CLIENT_SECRET=your-client-secret
   GOOGLE_REDIRECT_URI=http://localhost:5000/auth/google/callback
   GOOGLE_REFRESH_TOKEN=your-refresh-token
   ```

4. **Install dependencies:**
   ```bash
   npm install
   ```

5. **Start the server:**
   ```bash
   npm run dev
   ```

   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd mental-support-frontend
   ```

2. **Create environment file:**
   ```bash
   copy .env.local.example .env.local
   ```

3. **Configure environment variables in `.env.local`:**
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. **Install dependencies:**
   ```bash
   npm install
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

   Frontend will run on `http://localhost:3000`

## ⚙️ Configuration Guides

### MongoDB Setup

**Option 1: Local MongoDB**
1. Install MongoDB Community Edition
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/mental-support`

**Option 2: MongoDB Atlas (Cloud)**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

### Email Service Setup (Gmail)

1. Go to Google Account Settings
2. Enable 2-Factor Authentication
3. Generate App Password:
   - Go to Security → 2-Step Verification → App Passwords
   - Select "Mail" and "Other"
   - Copy the generated password
4. Use this password in `EMAIL_PASSWORD` env variable

### Google Calendar API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google Calendar API
4. Create OAuth 2.0 credentials:
   - Go to APIs & Services → Credentials
   - Create OAuth client ID
   - Add authorized redirect URIs
5. Get Client ID and Client Secret
6. Generate Refresh Token:
   ```bash
   # Use Google OAuth Playground
   # https://developers.google.com/oauthplayground
   ```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### User
- `GET /api/user/profile` - Get user profile (Protected)
- `PUT /api/user/profile` - Update profile (Protected)
- `GET /api/user/dashboard` - Get dashboard data (Protected)
- `GET /api/user/bookings` - Get user bookings (Protected)

### Booking
- `POST /api/booking/create` - Create booking (Protected)
- `GET /api/booking/:id` - Get booking details (Protected)
- `PUT /api/booking/:id/cancel` - Cancel booking (Protected)
- `GET /api/booking/slots/available` - Get available time slots

### Support
- `POST /api/support/request` - Submit support request
- `GET /api/support/my-requests` - Get user requests (Protected)
- `GET /api/support/request/:id` - Get specific request (Protected)

## 🎨 Design Philosophy

The website features a calming and supportive design:
- **Color Palette**: Soft blues, greens, and neutral tones
- **Typography**: Large, readable fonts for accessibility
- **Animations**: Smooth GSAP transitions for enhanced UX
- **Spacing**: Generous white space for a clean look
- **Positive Messaging**: Encouraging quotes and messages throughout

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Input validation and sanitization
- Rate limiting on API endpoints
- CORS protection
- Helmet.js security headers
- MongoDB injection prevention

## 📱 Responsive Design

The website is fully responsive with breakpoints for:
- Mobile (< 768px)
- Tablet (768px - 1024px)
- Desktop (> 1024px)

## 🚧 Additional Pages to Implement

You can extend the project by adding these pages:

### Frontend Pages (Create in `app/` directory):

1. **Login Page** (`app/login/page.tsx`)
2. **Register Page** (`app/register/page.tsx`)
3. **Dashboard Page** (`app/dashboard/page.tsx`)
4. **Book Session Page** (`app/book-session/page.tsx`)
5. **Resources/FAQ Page** (`app/resources/page.tsx`)
6. **Contact Page** (`app/contact/page.tsx`)
7. **Password Reset Page** (`app/reset-password/page.tsx`)

Each page should:
- Use the `'use client'` directive for client components
- Integrate with the API using functions from `lib/api.ts`
- Use the `useAuth` hook from `context/AuthContext.tsx`
- Apply GSAP animations for smooth transitions
- Follow the established color scheme and design patterns

## 🧪 Testing

### Backend Testing
```bash
cd mental-support-backend
# Test API health
curl http://localhost:5000/api/health
```

### Frontend Testing
```bash
cd mental-support-frontend
npm run build  # Test production build
```

## 📈 Future Enhancements

- [ ] Video counseling integration
- [ ] Chat support system
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Payment integration for premium services
- [ ] AI-powered mental health assessment
- [ ] Group therapy sessions
- [ ] Counselor rating system

## 🤝 Contributing

This is a charitable project aimed at helping people with mental health support. Contributions are welcome!

## 📄 License

This project is open source and available for charitable use.

## 💚 Support

If you or someone you know is experiencing a mental health crisis:
- **National Suicide Prevention Lifeline**: 988
- **Crisis Text Line**: Text HOME to 741741
- **International Association for Suicide Prevention**: https://www.iasp.info/resources/Crisis_Centres/

Remember: It's okay to not be okay. Seeking help is a sign of strength. 💪

---

**Built with 💚 for mental health awareness and support**
"# Mental_health_support" 
