const express = require("express");
const chatController = require("../controller/chatController");

const router = express.Router();

router.post("/runChat", async (req, res) => {
  const { userInput } = req.body;

  try {
    const chatResponse = await chatController.runChat(userInput);
    res.json({ chatResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
