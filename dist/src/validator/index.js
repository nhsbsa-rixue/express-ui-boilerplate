"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = void 0;
const express_validator_1 = require("express-validator");
/**
 * This is a middleware function that meant to be called in prior to a controller,
 * Uses express-validator to check the request body,
 * based on the schema provided.
 *
 * If there is any error, request will be redirected back to the same page,
 * Errors are store in the session.
 *
 * @param req
 *
 */
const validator = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req).array();
    if (!errors || errors.length === 0) {
        return next();
    }
    if (!req.session) {
        return next(new Error("Session is not initialised"));
    }
    req.session.body = req.body;
    req.session.error = {
        errorList: errors.map((error) => ({
            text: req.t(error.msg),
            href: `#${error.path}`,
        })),
        fields: {},
    };
    errors.forEach((error) => {
        req.session.error.fields[error.path] = error.msg;
    });
    return res.redirect(req.route.path);
};
exports.validator = validator;
//# sourceMappingURL=index.js.map