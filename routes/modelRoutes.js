// modelRoutes.js
const express = require('express');
const router = express.Router();
const modelController = require('../controller/modelsController');

// Route to load the face detection models
router.get('/loadModels', modelController.loadModels);

module.exports = router;
