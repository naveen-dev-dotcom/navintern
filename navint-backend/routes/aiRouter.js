var express = require("express");
var router = express.Router();
var axios = require("axios");
require("dotenv").config(); // Make sure this is loaded somewhere (usually in server.js)

// POST /ai - Combine file analysis + user query, get AI response
router.post("/", async function (req, res) {
  var text = req.body.text;
  var file_data = req.body.file_data;

  // Combine inputs for AI prompt
  var prompt = "User said: " + text + "\nEmotion analysis: " + JSON.stringify(file_data);

  try {
    var response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo", // Or any model available in OpenRouter
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: "Bearer " + process.env.OPENROUTER_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    var aiMessage = response.data.choices?.[0]?.message?.content || "No response from AI";
    res.json({ ai_message: aiMessage });
  } catch (err) {
    console.error("OpenRouter error:", err.message);
    res.status(500).json({ error: "AI processing failed" });
  }
});

module.exports = router;
