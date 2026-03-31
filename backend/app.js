const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('./models/Users');
const aiRoutes = require('./src/routes/ai.routes');
const authRoutes = require('./src/routes/auth.routes');
const dashboardRoutes = require('./src/routes/dashboard.routes');

const app = express();

// ─── Core Middleware ──────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── CORS Configuration ───────────────────────────────────────────────────────
const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            'https://healio-b3rnsvvza-abhinavch2105-gmailcoms-projects.vercel.app',
            process.env.FRONTEND_URL?.replace(/\/$/, ''),
            'http://localhost:5173',
            'http://localhost:3000'
        ].filter(Boolean);

        if (!origin) return callback(null, true);

        if (origin.includes('vercel.app')) {
            return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        console.warn(`CORS blocked: ${origin}`);
        callback(new Error('Not allowed by CORS'));
    },

    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight requests

// ─── Session & Passport (must be before routes) ───────────────────────────────
app.use(session({
    secret: process.env.SESSION_SECRET || 'healio_session_secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// ─── Google OAuth Strategy ────────────────────────────────────────────────────
passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.FRONTEND_URL}/api/auth/google/callback` || process.env.GOOGLE_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            const email = profile.emails?.[0]?.value;
            if (!email) return done(new Error('No email from Google'), null);

            // Find or create user
            let user = await User.findOne({ email });
            if (!user) {
                user = new User({
                    firstName: profile.name?.givenName || 'User',
                    lastName: profile.name?.familyName || '',
                    email,
                    password: `google_oauth_${profile.id}`, // placeholder, not used for login
                    isEmailVerified: true
                });
                await user.save();
            }

            return done(null, user);
        } catch (err) {
            return done(err, null);
        }
    }
));

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id).select('-password');
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

// ─── Request Logging ──────────────────────────────────────────────────────────
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/ai', aiRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString(), version: '1.0.0' });
});

// ─── 404 ──────────────────────────────────────────────────────────────────────
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found', path: req.originalUrl });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use((error, req, res, next) => {
    console.error('Global error handler:', error);
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
});

module.exports = app;
