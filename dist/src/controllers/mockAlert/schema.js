"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSchema = void 0;
const express_validator_1 = require("express-validator");
const PostSchema = [
    (0, express_validator_1.body)("alertType").isIn(["day", "night", "fullDay"]).withMessage("Alert type must be one of: day, night, fullDay"),
];
exports.PostSchema = PostSchema;
//# sourceMappingURL=schema.js.map