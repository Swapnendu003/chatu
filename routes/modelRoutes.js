// emotionAnalysisRoute.js
const express = require('express');
const multer = require('multer'); // for handling multipart/form-data
const router = express.Router();
const { analyzeEmotionForFrame } = require('../controller/modelsController');


// Configure multer for handling file uploads
const upload = multer();

// Route for analyzing a single video frame
router.post('/analyzeFrame', upload.single('frame'), async (req, res) => {
  try {
    const frame = req.file;
    if (!frame) {
      return res.status(400).json({ message: 'No frame data received' });
    }
    const emotions = await analyzeEmotionForFrame(emotionAnalysisApiUrl, frame.buffer);
    res.json({ emotions });
  } catch (error) {
    console.error('Error analyzing emotion for frame:', error);
    res.status(500).json({ message: 'Failed to analyze emotion for frame' });
  }
});

module.exports = router;
