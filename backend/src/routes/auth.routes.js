const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { signup, login, getProfile, updateProfile } = require('../controller/auth.controllers');
const { authenticateToken } = require('../middleware/auth');

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Google OAuth routes
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: `${process.env.FRONTEND_URL}/login?error=google_failed` }),
  (req, res) => {
    // Issue a JWT so the frontend can use the same token-based auth flow
    const token = jwt.sign(
      { userId: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Redirect to frontend callback handler with token
    // The frontend stores the redirect path in sessionStorage before initiating OAuth
    const redirectPath = '/dashboard';
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}&redirect=${encodeURIComponent(redirectPath)}`);
  }
);

// Protected routes
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);

module.exports = router;