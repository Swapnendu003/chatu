// routes.js
const express = require('express');
const router = express.Router();
const modelController = require('../controller/modelsController');

// POST endpoint for computing emotion
router.post('/computeEmotion', modelController.computeEmotion);

module.exports = router;
