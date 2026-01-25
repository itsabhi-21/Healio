const express = require('express');
const router = express.Router();
const { getHealthInfo } = require('../controller/ai.controllers');

router.post('/symptoms', getHealthInfo);

module.exports = router;