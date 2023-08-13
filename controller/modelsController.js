// modelController.js
const path = require('path');
const fs = require('fs');

function loadModels(req, res) {
    try {
        // Define the paths to the model files
        const modelPaths = {
            tinyFaceDetector: '/models/tiny_face_detector_model-weights_manifest.json',
            faceLandmark68Net: '/models/face_landmark_68_model-weights_manifest.json',
            faceRecognitionNet: '/models/face_recognition_model-weights_manifest.json',
            faceExpressionNet: '/models/face_expression_model-weights_manifest.json',
        };

        // Read the model files
        const models = {};
        for (const [modelName, modelPath] of Object.entries(modelPaths)) {
            const filePath = path.join(__dirname, '..', modelPath);
            console.log(filePath);
            if (fs.existsSync(filePath)) {
                models[modelName] = fs.readFileSync(filePath, 'utf8');
            } else {
                console.error(`Model file not found: ${filePath}`);
                res.status(500).json({ message: `Model file not found: ${modelName}` });
                return;
            }
        }

        // Send the models to the frontend
        res.json(models);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to load models' });
    }
}

module.exports = {
    loadModels
};
