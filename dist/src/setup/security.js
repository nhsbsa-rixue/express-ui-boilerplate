"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_crypto_1 = __importDefault(require("node:crypto"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const generateNonce = (_req, res, next) => {
    // Attach the nonce to response locals to be used in the view
    res.locals.nonce = `nonce-${node_crypto_1.default.randomBytes(16).toString("base64")}`;
    next();
};
const helmetConfig = (_req, res, next) => {
    helmet_1.default.contentSecurityPolicy({
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
const setupSecurity = (app) => {
    app.disable("x-powered-by");
    app.use(generateNonce);
    app.use(helmetConfig);
    app.use((0, compression_1.default)());
};
exports.default = setupSecurity;
//# sourceMappingURL=security.js.map