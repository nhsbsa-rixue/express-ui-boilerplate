import express from "express";
import setup from "./setup/index.js";
import logger from "./logger/index.js";
import config from "./config/index.js";

const { PORT, APP_NAME, CONTEXT_PATH } = config;
const app = express();
setup(app);

const server = app.listen(PORT, () => {
  logger.info(
    `${APP_NAME} listening at http://localhost:${PORT}${CONTEXT_PATH}`,
  );
});

process.on("SIGTERM", () => {
  debug("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    debug("HTTP server closed");
  });
});
