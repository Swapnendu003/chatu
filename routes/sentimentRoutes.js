/*const express = require('express');
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

module.exports = router;*/

/*const express = require('express');
const sentimentController = require('../controller/sentimentController');

const router = express.Router();

router.post('/analyze', async (req, res) => {
  try {
    const { questions } = req.body;
    const sentimentScores = await sentimentController.analyzeSentiment(questions);
    
    // Calculate the average sentiment score
    const totalScores = sentimentScores.length;
    const positiveScores = sentimentScores.filter(score => score === 'positive').length;
    const averageScore = positiveScores / totalScores;

    // Provide a suggestion based on the average score
    let suggestion = '';
    if (averageScore >= 0.6) {
      suggestion = 'You seem to be doing great! Keep it up!';
    } else if (averageScore >= 0.4) {
      suggestion = `You're doing okay, but there's room for improvement. Stay positive!`;
    } else {
      suggestion = 'It seems like you might be having a tough time. Reach out for support if needed.';
    }

    res.json({ averageScore, suggestion });
  } catch (error) {
    res.status(500).json({ error: 'Error in sentiment analysis' });
  }
});

module.exports = router;*/
const express = require('express');
const sentimentController = require('../controller/sentimentController');

const router = express.Router();

// Analyze sentiment of a list of answers
router.post('/analyze', async (req, res) => {
  try {
    const { answers } = req.body;
    const sentiments = await sentimentController.analyzeSentiments(answers);
    res.json({ sentiments });
  } catch (error) {
    res.status(500).json({ error: 'Error in sentiment analysis' });
  }
});

module.exports = router;

