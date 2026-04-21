"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
exports.default = [
    (0, express_validator_1.body)("year")
        .trim()
        .notEmpty()
        .bail()
        .withMessage("dob.yearRequired")
        .isInt()
        .isLength({ min: 4, max: 4 })
        .withMessage("dob.yearLength"),
    (0, express_validator_1.body)("month").trim().notEmpty().withMessage("dob.monthRequired"),
    (0, express_validator_1.body)("day").trim().notEmpty().withMessage("dob.dayRequired"),
];
//# sourceMappingURL=schema.js.map