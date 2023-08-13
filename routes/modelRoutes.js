const express = require('express');
const multer = require('multer');
const modelController = require('../controller/modelsController');

const router = express.Router();
const upload = multer();

router.post('/analyzeVideoEmotions', upload.array('frames'), async (req, res) => {
  try {
    const emotionAnalysisApiUrl = 'http://example.com/emotion-analysis-api'; // Replace with the actual API URL
    const frames = req.files.map((file) => file.buffer);
    const emotions = await modelController.analyzeEmotionForVideoFrames(emotionAnalysisApiUrl, frames);
    res.json({ emotions });
  } catch (error) {
    console.error('Error analyzing video emotions:', error);
    res.status(500).json({ message: 'Failed to analyze video emotions' });
  }
});

module.exports = router;
