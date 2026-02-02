const express = require('express');
const router = express.Router();
const { 
    analyzeUserSymptoms, 
    getSymptomSession, 
    submitFeedback, 
    getUserSymptomHistory 
} = require('../controller/ai.controllers');
const { authenticateToken, optionalAuth } = require('../middleware/auth');

// Symptom analysis (requires authentication)
router.post('/symptoms/analyze', authenticateToken, analyzeUserSymptoms);

// Get specific symptom session
router.get('/symptoms/session/:sessionId', authenticateToken, getSymptomSession);

// Submit feedback for a session
router.post('/symptoms/session/:sessionId/feedback', authenticateToken, submitFeedback);

// Get user's symptom history
router.get('/symptoms/history', authenticateToken, getUserSymptomHistory);

// Legacy route for backward compatibility (optional auth)
router.post('/symptoms', optionalAuth, analyzeUserSymptoms);

module.exports = router;