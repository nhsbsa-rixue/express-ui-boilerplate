import express from "express";
import config from "./config";
import { setupCronJobs } from "./cronJobs";
import logger from "./logger";
import setup from "./setup";

logger.info("Starting application...");

const { PORT, APP_NAME, CONTEXT_PATH } = config;
const app = express();
setup(app);
setupCronJobs();

const server = app.listen(PORT, () => {
  logger.info(`${APP_NAME} listening at http://localhost:${PORT}${CONTEXT_PATH}`);
});

process.on("SIGTERM", () => {
  logger.debug("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    logger.debug("HTTP server closed");
  });
});

export default server;
