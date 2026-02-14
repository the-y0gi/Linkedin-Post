const dotenv = require("dotenv");

dotenv.config();

const requiredEnvVariables = ["PORT", "GEMINI_API_KEY"];

requiredEnvVariables.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

const env = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
};

module.exports = { env };
