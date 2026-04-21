"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSchema = void 0;
const express_validator_1 = require("express-validator");
const PostSchema = [
    (0, express_validator_1.body)("productId").trim().notEmpty().withMessage("productId is required."),
    (0, express_validator_1.body)("userEmail").trim().isEmail().withMessage("Valid userEmail is required."),
    (0, express_validator_1.body)("desiredPrice").trim().notEmpty().withMessage("desiredPrice is required."),
    (0, express_validator_1.body)("alertBy24Hours").optional().trim().isBoolean().withMessage("fullDayAlert must be a boolean."),
    (0, express_validator_1.body)("alertMorning").optional().trim().isBoolean().withMessage("morningAlert must be a boolean."),
    (0, express_validator_1.body)("alertByNight").optional().trim().isBoolean().withMessage("nightAlert must be a boolean."),
];
exports.PostSchema = PostSchema;
//# sourceMappingURL=schema.js.map