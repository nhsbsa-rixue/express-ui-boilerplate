import dotEnv from "dotenv";

dotEnv.config();

export default {
  APP_NAME: process.env.APP_NAME || "APP_NAME",
  CONTEXT_PATH: process.env.CONTEXT_PATH || "/",
  NODE_ENV: process.env.NODE_ENV || "development",
  SESSION_SECRET: process.env.SESSION_SECRET || "SESSION",
  REDIS_URL: process.env.REDIS_URL,
  LANGUAGES: process.env.LANGUAGES?.split(",") || ["en"],
  PORT: process.env.PORT || 8000,
};
