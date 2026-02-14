const { GoogleGenAI } = require("@google/genai");
const { env } = require("./env.config");
const ApiError = require("../utils/ApiError");

const ai = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

const generateContent = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    if (!response || !response.text) {
      throw new ApiError(500, "Empty response from Gemini");
    }

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new ApiError(500, "Failed to generate content from AI service");
  }
};

module.exports = {
  generateContent,
};
