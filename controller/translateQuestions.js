const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const translateEndpoint = 'https://api.cognitive.microsofttranslator.com/translate';
const apiKey = '133a7f49bf4040f38c7c8d08d8354380';
const location = 'centralus';
const translateTextArray = async (textArray, to) => {
    try {
      const translations = await axios.post(
        `${translateEndpoint}?api-version=3.0&to=${to}`,
        textArray.map((text) => ({ text })),
        {
          headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': apiKey,
            'Ocp-Apim-Subscription-Region': location,
            'X-ClientTraceId': uuidv4().toString(),
          },
        }
      );
  
      return translations.data.map((translation) => translation.translations[0].text);
    } catch (error) {
      console.error('Translation Error:', error.message);
      throw new Error('Translation Error');
    }
  }
  
  const translateQuestions = async (req, res) => {
    try {
      const { questions, to } = req.body;
      const translatedQuestions = await translateTextArray(questions, to);
      res.json({ translatedQuestions });
    } catch (error) {
      console.error('Translation error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

module.exports = { translateQuestions }