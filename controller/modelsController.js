const axios = require('axios');
const FormData = require('form-data'); // Import form-data module
const fs = require('fs'); // Import fs module
const path = require('path'); // Import path module
const emotionAnalysisApiUrl = 'https://api.deepai.org/api/facial-expression-recognition';

async function analyzeEmotionForFrame(emotionAnalysisApiUrl, frame) {
  try {
    const form = new FormData();
    // Append the image data to the form
    form.append('image', frame, 'emotion-frame.jpg', { contentType: 'image/jpeg' });
    
    // Send the form data to the API
    const response = await axios.post(emotionAnalysisApiUrl, form, {
      headers: {
        ...form.getHeaders(), // Include form headers
      },
    });
    return response.data.output;
  } catch (error) {
    console.error('Error analyzing emotion for frame:', error);
    return { message: 'Failed to analyze emotion for frame' };
  }
}

module.exports = {
  analyzeEmotionForFrame,
};
