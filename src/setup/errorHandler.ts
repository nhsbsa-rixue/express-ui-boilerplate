import logger from "../logger";
import { getContextPath } from "../utils";
import { Express, ErrorRequestHandler } from "express";

const errorHandler:ErrorRequestHandler = (err, req, res, next) => {
  logger.error(err, err.message);
  switch (err.statusCode) {
    case 400:
      res.redirect(getContextPath("no-access"));
    default:
      res.redirect(getContextPath("problem-with-service"));
  }
  next();
};
const errorPages = ["page-not-found", "problem-with-service", "no-access"];

const setupErrorHandlers = (app: Express) => {
  errorPages.forEach((page) => {
    app.get(getContextPath(page), (req, res) => {
      return res.render(`error-pages/${page}`);
    });
  });

  app.use(errorHandler);

  app.all("*", (_, res) => {
    return res.status(404).redirect(getContextPath("page-not-found"));
  });
};

export default setupErrorHandlers;
