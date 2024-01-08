const express = require('express');
const router = express.Router();
const translationController = require ('../controller/translateQuestions')

router.post('/questions', translationController.translateQuestions);
module.exports = router;