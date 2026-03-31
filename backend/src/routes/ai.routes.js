const express = require('express');
const router = express.Router();
const { 
    analyzeUserSymptoms, 
    getSymptomSession, 
    submitFeedback, 
    getUserSymptomHistory 
} = require('../controller/ai.controllers');
const { authenticateToken } = require('../middleware/auth');

// All symptom routes require authentication
router.post('/symptoms/analyze', authenticateToken, analyzeUserSymptoms);
router.get('/symptoms/session/:sessionId', authenticateToken, getSymptomSession);
router.post('/symptoms/session/:sessionId/feedback', authenticateToken, submitFeedback);
router.get('/symptoms/history', authenticateToken, getUserSymptomHistory);

module.exports = router;