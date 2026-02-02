const express = require('express');
const router = express.Router();
const { getDashboardOverview, getHealthStats } = require('../controller/dashboard.controllers');
const { authenticateToken } = require('../middleware/auth');

// All dashboard routes require authentication
router.use(authenticateToken);

router.get('/overview', getDashboardOverview);
router.get('/stats', getHealthStats);

module.exports = router;