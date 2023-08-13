const axios = require('axios');
const emotionAnalysisApiUrl='https://api.deepai.org/api/facial-expression-recognition';
async function analyzeEmotionForFrame(emotionAnalysisApiUrl, frame) {
  try {
    const formData = new FormData();
    formData.append('frame', frame, 'emotion-frame.jpg');
    const response = await axios.post(emotionAnalysisApiUrl, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.emotions;
  } catch (error) {
    console.error('Error analyzing emotion for frame:', error);
    return { message: 'Failed to analyze emotion for frame' };
  }
}

async function analyzeEmotionForVideoFrames(emotionAnalysisApiUrl, frames) {
  const emotions = [];
  for (const frame of frames) {
    const frameEmotions = await analyzeEmotionForFrame(emotionAnalysisApiUrl, frame);
    emotions.push(frameEmotions);
  }
  return emotions;
}

module.exports = {
  analyzeEmotionForVideoFrames,
};
