import dotEnv from "dotenv";
import { CONSTANTS } from "../constants";

dotEnv.config({ quiet: true });

export default {
  APP_NAME: process.env.APP_NAME || CONSTANTS.DEFAULT_APP_NAME,
  NODE_ENV: process.env.NODE_ENV || CONSTANTS.DEFAULT_NODE_ENV,
  PORT: process.env.PORT || CONSTANTS.DEFAULT_PORT,
  CONTEXT_PATH: process.env.CONTEXT_PATH || CONSTANTS.DEFAULT_CONTEXT_PATH,
  LOG_LEVEL: process.env.LOG_LEVEL?.toLowerCase() || CONSTANTS.DEFAULT_LOG_LEVEL,
  SESSION_SECRET: process.env.SESSION_SECRET || CONSTANTS.DEFAULT_SESSION,
  REDIS_URL: process.env.REDIS_URL,
  LANGUAGES: process.env.LANGUAGES?.split(",") || CONSTANTS.DEFAULT_LANGUAGES,
  API_ENDPOINT: process.env.API_ENDPOINT || CONSTANTS.DEFAULT_API_ENDPOINT,
};
