// modelController.js
const path = require('path');
const fs = require('fs');
const faceapi = require('@vladmandic/face-api');
const { Canvas, Image, ImageData } = require('canvas');
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

// Load the models
async function loadModels() {
    const modelPaths = {
        tinyFaceDetector: 'models/tiny_face_detector_model-weights_manifest.json',
        faceLandmark68Net: 'models/face_landmark_68_model-weights_manifest.json',
        faceRecognitionNet: 'models/face_recognition_model-weights_manifest.json',
        faceExpressionNet: 'models/face_expression_model-weights_manifest.json',
    };

    await Promise.all(
        Object.values(modelPaths).map(async (modelPath) => {
            const filePath = path.join(__dirname, '..', modelPath);
            if (fs.existsSync(filePath)) {
                await faceapi.nets.tinyFaceDetector.loadFromDisk(filePath);
                await faceapi.nets.faceLandmark68Net.loadFromDisk(filePath);
                await faceapi.nets.faceRecognitionNet.loadFromDisk(filePath);
                await faceapi.nets.faceExpressionNet.loadFromDisk(filePath);
            } else {
                console.error('Model file not found:', filePath);
                throw new Error(`Model file not found: ${filePath}`);
            }
        })
    );
}

// Analyze emotions in the provided image
async function computeEmotion(req, res) {
    try {
        // Ensure that the models are loaded
        await loadModels();

        // Read the image data from the request
        const imageBase64 = req.body.image;
        const imageData = Buffer.from(imageBase64, 'base64');

        // Load the image as a tensor
        const image = await faceapi.bufferToImage(imageData);

        // Detect faces and analyze emotions
        const detections = await faceapi.detectAllFaces(image).withFaceExpressions();

        if (detections.length === 0) {
            return res.json({ message: 'No face detected in the image' });
        }

        // Get the emotion analysis results for the first detected face
        const expression = detections[0].expressions;
        const emotions = Object.keys(expression).reduce((result, expr) => {
            result[expr] = expression[expr];
            return result;
        }, {});

        // Send the emotion analysis results to the frontend
        res.json({ emotions });
    } catch (error) {
        console.error('Error computing emotion:', error);
        res.status(500).json({ message: 'Failed to compute emotion' });
    }
}

module.exports = {
    computeEmotion
};
