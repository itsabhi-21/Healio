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

// ─── Trust Proxy (REQUIRED on Render) ──────────────────────────────────────────
app.set('trust proxy', 1);

// ─── CORS Configuration ───────────────────────────────────────────────────────
const corsOptions = {
    origin: function(origin, callback) {
        const allowedOrigins = [
            'https://healio-wheat.vercel.app',
            'https://healio-qx1r6wzzg-abhinavch2105-gmailcoms-projects.vercel.app',
            'http://localhost:5173',
            'http://localhost:3000',
            'http://127.0.0.1:5173',
            'http://127.0.0.1:3000'
        ];

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.warn(`🚫 CORS blocked origin: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// ─── Basic setup ──────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Session setup ────────────────────────────────────────────────────────────
app.use(session({
    secret: process.env.SESSION_SECRET || 'healio_session_secret',
    resave: false,
    saveUninitialized: false,
    proxy:true,
    cookie: {
        httpOnly: true,
        secure: true,           // HTTPS only (required for SameSite=None)
        sameSite: 'none',       // Allow cross-site cookies
        maxAge: 7 * 24 * 60 * 60 * 1000 // 1 week
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// ─── Google Login Setup ───────────────────────────────────────────────────────
passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            const email = profile.emails?.[0]?.value;
            if (!email) return done(new Error('No email from Google'), null);

            let user = await User.findOne({ email });
            if (!user) {
                user = new User({
                    firstName: profile.name?.givenName || 'User',
                    lastName: profile.name?.familyName || '',
                    email,
                    password: `google_oauth_${profile.id}`,
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

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/ai', aiRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK' });
});

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// ─── Error Handler ────────────────────────────────────────────────────────────
app.use((error, req, res, next) => {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Something went wrong' });
});

module.exports = app;