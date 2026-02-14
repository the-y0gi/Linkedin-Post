const { generateContent } = require("../config/gemini.config");
const ApiError = require("../utils/ApiError");

const generateLinkedInPost = async (prompt) => {
  if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
    throw new ApiError(400, "Prompt is required to generate content");
  }

  try {
    const rawResponse = await generateContent(prompt);

    if (!rawResponse) {
      throw new ApiError(500, "AI service failed to return content");
    }

    let cleanedResponse = String(rawResponse)
      .trim()
      .replace(/\*\*/g, "") 
      .replace(/^["']|["']$/g, "")
      .replace(/\n{3,}/g, "\n\n");

    return cleanedResponse;

  } catch (error) {
    if (error instanceof ApiError) throw error;
    
    console.error("Gemini Generation Error:", error);
    
    throw new ApiError(500, "An error occurred while generating the LinkedIn post");
  }
};

module.exports = {
  generateLinkedInPost,
};