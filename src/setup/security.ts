import crypto from "node:crypto";
import compression from "compression";
import helmet from "helmet";

const generateNonce: Middleware = (_req, res, next) => {
  // Attach the nonce to response locals to be used in the view
  res.locals.nonce = `nonce-${crypto.randomBytes(16).toString("base64")}`;

  next();
};
const helmetConfig: Middleware = (_req, res, next) => {
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", () => res.locals.nonce],
      // Add other directives as needed
    },
  });
  next();
};

/**
 * Setup security for the application
 * @param {*} app
 */
const setupSecurity = (app: App) => {
  app.disable("x-powered-by");

  app.use(generateNonce);

  app.use(helmetConfig);

  app.use(compression());
};

export default setupSecurity;
