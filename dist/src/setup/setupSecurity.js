import helmet from "helmet";
import compression from "compression";
import crypto from "crypto";
const generateNonce = (req, res, next) => {
    // Attach the nonce to response locals to be used in the view
    res.locals.nonce = "nonce-" + crypto.randomBytes(16).toString("base64");
    next();
};
const helmetConfig = (req, res, next) => {
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
const setupSecurity = (app) => {
    app.disable("x-powered-by");
    app.use(generateNonce);
    app.use(helmetConfig);
    app.use(compression());
};
export default setupSecurity;
//# sourceMappingURL=setupSecurity.js.map