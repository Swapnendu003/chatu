// controllers/sentimentController.js
const fetch = require('isomorphic-fetch');
const transformersApiUrl = 'https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english';

const analyzeSentiment = async (text) => {
  try {
    const response = await fetch(transformersApiUrl, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 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', // Replace with your Hugging Face API key
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: text }),
    });

    if (!response.ok) {
      const errorResponse = await response.text();
      console.error('Error from Hugging Face API:', errorResponse);
      throw new Error('Error from Hugging Face API');
    }

    const result = await response.json();
    const data = result[0];

    if (Array.isArray(result)) {
      const scoreLabel0 = data[0].score;
      const scoreLabel1 = data[1].score;
      const sentiment = scoreLabel0 >= scoreLabel1 ? data[0].label : data[1].label;
      return sentiment;
    } else {
      throw new Error('Invalid response format from Hugging Face API');
    }
  } catch (error) {
    console.error('Error in sentiment analysis:', error);
    throw new Error('Error in sentiment analysis');
  }
};

module.exports = {
  analyzeSentiment,
};