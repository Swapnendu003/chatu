
const express = require("express");
const geminiController = require("../controller/geminiController");

const router = express.Router();

router.post("/generateGeminiResponse", async (req, res) => {
  const { userInput } = req.body;

  try {
    const geminiResponse = await geminiController.generateGeminiResponse(
      userInput
    );
    res.json({ geminiResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
