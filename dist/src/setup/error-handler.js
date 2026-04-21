"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const constants_1 = require("../constants");
const logger_1 = __importDefault(require("../logger"));
const utils_1 = require("../utils");
// Handle all errors
const errorPageHandler = (err, _req, res, _next) => {
    logger_1.default.error(err, err.message);
    if (http_status_codes_1.StatusCodes.FORBIDDEN === err.statusCode) {
        return res.redirect((0, utils_1.getRequestUri)(constants_1.CONSTANTS.NO_ACCESS));
    }
    return res.redirect((0, utils_1.getRequestUri)(constants_1.CONSTANTS.PROBLEM_WITH_SERVICE));
};
const notFoundPageHandler = (_req, res) => {
    return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).redirect((0, utils_1.getRequestUri)(constants_1.CONSTANTS.PAGE_NOT_FOUND));
};
const setupErrorHandlers = (app) => {
    // Register common error pages
    const commonErrorPages = [constants_1.CONSTANTS.PAGE_NOT_FOUND, constants_1.CONSTANTS.PROBLEM_WITH_SERVICE, constants_1.CONSTANTS.NO_ACCESS];
    commonErrorPages.forEach((page) => {
        app.get((0, utils_1.getRequestUri)(page), (_req, res) => {
            return res.render(`error-pages/${page}`);
        });
    });
    // Register error handler
    app.use(errorPageHandler);
    // All other routes will be redirected to a not-found page
    app.use(notFoundPageHandler);
};
exports.default = setupErrorHandlers;
//# sourceMappingURL=error-handler.js.map