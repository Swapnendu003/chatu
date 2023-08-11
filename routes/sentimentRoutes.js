// router/sentimentRouter.js
const express = require('express');
const sentimentController = require('../controller/sentimentController');

const router = express.Router();

router.post('/analyze', async (req, res) => {
  try {
    const { text } = req.body;
    const sentiment = await sentimentController.analyzeSentiment(text);
    res.json({ sentiment });
  } catch (error) {
    res.status(500).json({ error: 'Error in sentiment analysis' });
  }
});

module.exports = router;
