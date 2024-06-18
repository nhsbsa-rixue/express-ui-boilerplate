import express from "express";
import setup from "./setup";
import logger from "./logger";
import config from "./config";
const { PORT, APP_NAME, CONTEXT_PATH } = config;
const app = express();
setup(app);
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
//# sourceMappingURL=server.js.map