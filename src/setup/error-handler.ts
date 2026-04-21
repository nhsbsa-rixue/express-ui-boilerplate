import type { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { CONSTANTS } from "../constants";
import logger from "../logger";
import { getRequestUri } from "../utils";

// Handle all errors
const errorPageHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  logger.error(err, err.message);

  if (StatusCodes.FORBIDDEN === err.statusCode) {
    return res.redirect(getRequestUri(CONSTANTS.NO_ACCESS));
  }

  return res.redirect(getRequestUri(CONSTANTS.PROBLEM_WITH_SERVICE));
};

const notFoundPageHandler: Middleware = (_req, res) => {
  return res.status(StatusCodes.NOT_FOUND).redirect(getRequestUri(CONSTANTS.PAGE_NOT_FOUND));
};

const setupErrorHandlers = (app: App) => {
  // Register common error pages
  const commonErrorPages = [CONSTANTS.PAGE_NOT_FOUND, CONSTANTS.PROBLEM_WITH_SERVICE, CONSTANTS.NO_ACCESS];
  commonErrorPages.forEach((page) => {
    app.get(getRequestUri(page), (_req, res) => {
      return res.render(`error-pages/${page}`);
    });
  });

  // Register error handler
  app.use(errorPageHandler);

  // All other routes will be redirected to a not-found page
  app.use(notFoundPageHandler);
};

export default setupErrorHandlers;
