import { createLogger, format, transports } from "winston";
import config from "../config";
import { CONSTANTS } from "../constants";

const logger = createLogger({
  level: config.LOG_LEVEL || CONSTANTS.DEFAULT_LOG_LEVEL,
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
  ],
});

export default logger;
