const buildVoiceInstruction = (voice) => {
  const voiceMap = {
    contrarian: `
- Tone: Provocative and counter-intuitive.
- Strategy: Start by debunking a popular "best practice."
- Language: Direct, sharp, and skeptical of the status quo.
- Constraint: Absolutely no emojis or corporate fluff.`,

    authoritative: `
- Tone: Thought-leader, seasoned expert.
- Strategy: Share "hard truths" or data-backed insights.
- Language: Decisive (use "will" instead of "might").
- Constraint: Professional and polished, no slang.`,

    friendly: `
- Tone: Peer-to-peer, relatable mentor.
- Strategy: Share a personal observation or "lesson learned."
- Language: Warm, conversational, and inclusive.
- Constraint: Max 2 emojis, keep it grounded.`,

    motivational: `
- Tone: High-energy and vision-oriented.
- Strategy: Focus on the "transformation" from pain to success.
- Language: Action-oriented (Verbs first).
- Constraint: Avoid being "cringey"; keep the inspiration authentic.`
  };

  return voiceMap[voice] || voiceMap["friendly"];
};

const buildLengthInstruction = (length) => {
  const lengthMap = {
    short: "- Format: Punchy and minimalist. Max 50-80 words.",
    medium: "- Format: Standard LinkedIn post. 120-180 words. Mix of short and slightly longer sentences.",
    long: "- Format: In-depth 'Value Bomb'. 250+ words. Use sub-headers or numbered lists for readability."
  };

  return lengthMap[length] || lengthMap["medium"];
};

const buildPrompt = ({ voice, audience, topic, length, includeCallToAction = true }) => {
  const voiceInstruction = buildVoiceInstruction(voice);
  const lengthInstruction = buildLengthInstruction(length);

  return `
Role: You are a top 1% LinkedIn Ghostwriter specializing in ${topic}.

Task: Write a high-engagement LinkedIn post for ${audience}.

Context & Guidelines:
- Topic: ${topic}
- Voice Profile: ${voiceInstruction}
- Length/Density: ${lengthInstruction}

Writing Rules (Strict):
1. THE HOOK: The first line must be a "scroll-stopper." Use a bold claim, a surprising stat, or a relatable pain point.
2. WHITE SPACE: Use frequent line breaks. No paragraph should be longer than 2 sentences.
3. NO AI-ISMS: Do NOT use words like "tapestry," "delve," "harness," "shaping the future," or "supercharge."
4. SHOW, DON'T TELL: Instead of saying "X is important," explain the consequence of ignoring X.
5. STRUCTURE: Use a "Bridge" format (Hook -> The Problem -> The Insight/Solution -> The Takeaway).

Closing:
${includeCallToAction ? "- End with a low-friction question to encourage comments (CTA)." : "- End with a powerful one-line closing statement."}

Constraint: No hashtags. No robotic introductions. Start directly with the hook.
`;
};

module.exports = { buildPrompt };