const express = require('express');
const router = express.Router();
const { signup, login, getProfile, updateProfile } = require('../controller/auth.controllers');
const { authenticateToken } = require('../middleware/auth');

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Protected routes
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);

module.exports = router;