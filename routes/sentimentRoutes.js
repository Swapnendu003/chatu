const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const translateEndpoint = 'https://api.cognitive.microsofttranslator.com/translate';
const apiKey = '133a7f49bf4040f38c7c8d08d8354380';
const location = 'centralus'


  const translateText = async (text, to, from) => {
    try {
      const translation = await axios.post(
        `${translateEndpoint}?api-version=3.0&from=${from}&to=${to}`,
        [{ text }],
        {
          headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': apiKey,
            'Ocp-Apim-Subscription-Region': location,
            'X-ClientTraceId': uuidv4().toString(),
          },
        }
      );
  
      return translation.data[0].translations[0].text;
    } catch (error) {
      console.error('Translation Error:', error.message);
      throw new Error('Translation Error');
    }
  }
  



const express = require('express');
const sentimentController = require('../controller/sentimentController');

const router = express.Router();

// Analyze sentiment of a list of answers
router.post('/analyze', async (req, res) => {
  try {
    const { responses } = req.body;
    //const translatedResponse = await translateText(response, from, 'en');
    const translatedResponse = await Promise.all(responses.map(response => translateText(response, 'en', 'bn')));
    //console.log (translatedResponse);
    const sentiments = await sentimentController.analyzeSentiments(translatedResponse);
    res.json({ sentiments });
  } catch (error) {
    res.status(500).json({ error: 'Error in sentiment analysis' });
  }
});

module.exports = router;

