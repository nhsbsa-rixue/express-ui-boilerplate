import express from "express";
import setup from "./setup/index.js";
import logger from "./logger/index.js";
import config from "./config/index.js";

const app = express();
setup(app);

const server = app.listen(config.PORT, () => {
  logger.info(`Example app listening at http://localhost:${config.PORT}`);
});

process.on("SIGTERM", () => {
  debug("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    debug("HTTP server closed");
  });
});
