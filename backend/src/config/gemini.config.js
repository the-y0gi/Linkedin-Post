const { env } = require("../config/env.config");
const ApiError = require("../utils/ApiError");

let aiInstance = null;

const getAIInstance = async () => {
  try {
    if (!aiInstance) {
      const { GoogleGenAI } = await import("@google/genai");

      aiInstance = new GoogleGenAI({
        apiKey: env.GEMINI_API_KEY,
      });
    }

    return aiInstance;
  } catch (error) {
    console.error("Failed to initialize Gemini:", error);
    throw new ApiError(500, "AI service initialization failed");
  }
};

const generateContent = async (prompt) => {
  try {
    const ai = await getAIInstance();

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
