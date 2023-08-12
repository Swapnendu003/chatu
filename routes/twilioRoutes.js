const express = require('express');
const callController = require('../controller/twilioController');

const router = express.Router();

// Define route for making a call
router.post('/makeCall', callController.makeCall);

module.exports = router;
