import logger from "../logger/index.js";
import { getContextPath } from "../utils/index.js";

const errorHandler = (err, req, res, next) => {
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

const setupErrorHandlers = (app) => {
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
