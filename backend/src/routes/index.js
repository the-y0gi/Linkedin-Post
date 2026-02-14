const express = require("express");
const router = express.Router();

const postRoutes = require("./post.routes");

router.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "API is healthy 🚀",
  });
});

router.use("/posts", postRoutes);

module.exports = router;
