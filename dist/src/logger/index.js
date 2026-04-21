"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const config_1 = __importDefault(require("../config"));
const constants_1 = require("../constants");
const logger = (0, winston_1.createLogger)({
    level: config_1.default.LOG_LEVEL || constants_1.CONSTANTS.DEFAULT_LOG_LEVEL,
    format: winston_1.format.combine(winston_1.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
    }), winston_1.format.errors({ stack: true }), winston_1.format.splat(), winston_1.format.json()),
    transports: [
        new winston_1.transports.Console({
            format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple()),
        }),
    ],
});
exports.default = logger;
//# sourceMappingURL=index.js.map