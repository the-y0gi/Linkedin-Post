const { z } = require("zod");

const voiceEnum = z.enum([
  "contrarian",
  "authoritative",
  "friendly",
  "motivational",
]);

const lengthEnum = z.enum(["short", "medium", "long"]).optional();

const generatePostSchema = z.object({
  voice: voiceEnum,
  audience: z
    .string()
    .min(3, "Audience must be at least 3 characters")
    .max(100, "Audience too long"),

  topic: z
    .string()
    .min(5, "Topic must be at least 5 characters")
    .max(300, "Topic too long"),

  length: lengthEnum,
});

const improveHookSchema = z.object({
  post: z
    .string()
    .min(20, "Post content too short to improve hook")
    .max(5000, "Post too long"),
});

module.exports = {
  generatePostSchema,
  improveHookSchema,
};
