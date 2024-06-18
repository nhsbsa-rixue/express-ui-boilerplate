import helmet from "helmet";
import compression from "compression";
import crypto from "crypto";
import { RequestHandler, Express } from "express";

const generateNonce:RequestHandler = (req, res, next) => {
  // Attach the nonce to response locals to be used in the view
  res.locals.nonce = "nonce-" + crypto.randomBytes(16).toString("base64");

  next();
};
const helmetConfig:RequestHandler = (req, res, next) => {
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", () => res.nonce],
      // Add other directives as needed
    },
  });
  next();
};

/**
 * Setup security for the application
 * @param {*} app
 */
const setupSecurity = (app: Express) => {
  app.disable("x-powered-by");

  app.use(generateNonce);

  app.use(helmetConfig);

  app.use(compression());
};

export default setupSecurity;
