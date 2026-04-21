"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const cronJobs_1 = require("./cronJobs");
const logger_1 = __importDefault(require("./logger"));
const setup_1 = __importDefault(require("./setup"));
logger_1.default.info("Starting application...");
const { PORT, APP_NAME, CONTEXT_PATH } = config_1.default;
const app = (0, express_1.default)();
(0, setup_1.default)(app);
(0, cronJobs_1.setupCronJobs)();
const server = app.listen(PORT, () => {
    logger_1.default.info(`${APP_NAME} listening at http://localhost:${PORT}${CONTEXT_PATH}`);
});
process.on("SIGTERM", () => {
    logger_1.default.debug("SIGTERM signal received: closing HTTP server");
    server.close(() => {
        logger_1.default.debug("HTTP server closed");
    });
});
exports.default = server;
//# sourceMappingURL=server.js.map