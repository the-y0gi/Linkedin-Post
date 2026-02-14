const { buildPrompt } = require("../utils/promptBuilder");
const { generateLinkedInPost } = require("../services/ai.service");

const generatePost = async (req, res) => {
  const { voice, audience, topic, length } = req.body;
  const prompt = buildPrompt({
    voice,
    audience,
    topic,
    length,
  });

  const post = await generateLinkedInPost(prompt);

  res.status(200).json({
    status: "success",
    data: {
      post,
    },
  });
};

const improveHook = async (req, res) => {
  const { post } = req.body;

  const prompt = `
You are an expert LinkedIn content editor.

Rewrite ONLY the first 1–2 lines of the following LinkedIn post to create a stronger and more attention-grabbing hook.

Do NOT modify the rest of the post.
Return the full updated post.

Here is the post:

${post}
`;

  const improvedPost = await generateLinkedInPost(prompt);

  res.status(200).json({
    status: "success",
    data: {
      post: improvedPost,
    },
  });
};

module.exports = {
  generatePost,
  improveHook,
};
