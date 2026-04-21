"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
exports.default = [
    (0, express_validator_1.body)("firstName").trim().notEmpty().withMessage("name.firstNameRequired"),
    (0, express_validator_1.body)("lastName").trim().notEmpty().withMessage("name.lastNameRequired"),
];
//# sourceMappingURL=schema.js.map