import dotEnv from "dotenv";

dotEnv.config();

export default {
  APP_NAME: process.env.APP_NAME || "APP_NAME",
  NODE_ENV: process.env.NODE_ENV,
  SESSION_SECRET: process.env.SESSION_SECRET,
  REDIS_URL: process.env.REDIS_URL,
  LANGUAGES: process.env.LANGUAGES?.split(",") || ["en"],
  PORT: process.env.PORT || 8000,
};
