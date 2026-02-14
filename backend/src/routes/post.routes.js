const express = require("express");
const router = express.Router();

const { generatePost, improveHook } = require("../controllers/post.controller");
const { validate } = require("../middlewares/validate.middleware");
const {
  generatePostSchema,
  improveHookSchema,
} = require("../validators/post.validator");

router.post("/generate", validate(generatePostSchema), generatePost);

router.post("/improve-hook", validate(improveHookSchema), improveHook);

module.exports = router;
