"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const constants_1 = require("../constants");
dotenv_1.default.config({ quiet: true });
exports.default = {
    APP_NAME: process.env.APP_NAME || constants_1.CONSTANTS.DEFAULT_APP_NAME,
    NODE_ENV: process.env.NODE_ENV || constants_1.CONSTANTS.DEFAULT_NODE_ENV,
    PORT: process.env.PORT || constants_1.CONSTANTS.DEFAULT_PORT,
    CONTEXT_PATH: process.env.CONTEXT_PATH || constants_1.CONSTANTS.DEFAULT_CONTEXT_PATH,
    LOG_LEVEL: process.env.LOG_LEVEL?.toLowerCase() || constants_1.CONSTANTS.DEFAULT_LOG_LEVEL,
    SESSION_SECRET: process.env.SESSION_SECRET || constants_1.CONSTANTS.DEFAULT_SESSION,
    REDIS_URL: process.env.REDIS_URL,
    LANGUAGES: process.env.LANGUAGES?.split(",") || constants_1.CONSTANTS.DEFAULT_LANGUAGES,
    API_ENDPOINT: process.env.API_ENDPOINT || constants_1.CONSTANTS.DEFAULT_API_ENDPOINT,
};
//# sourceMappingURL=index.js.map