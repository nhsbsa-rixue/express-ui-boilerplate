"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PutSchema = exports.PostSchema = exports.GetSchema = exports.DeleteSchema = void 0;
const express_validator_1 = require("express-validator");
const GetSchema = [
    (0, express_validator_1.param)("id").trim().notEmpty().withMessage("id is required.").isUUID().withMessage("id must be a valid UUID."),
];
exports.GetSchema = GetSchema;
const DeleteSchema = [
    (0, express_validator_1.param)("id").trim().notEmpty().withMessage("id is required.").isUUID().withMessage("id must be a valid UUID."),
];
exports.DeleteSchema = DeleteSchema;
const PostSchema = [
    (0, express_validator_1.body)("name").trim().notEmpty().withMessage("name is required."),
    (0, express_validator_1.body)("price")
        .trim()
        .notEmpty()
        .withMessage("price is required.")
        .isNumeric()
        .withMessage("price must be a number.")
        .custom((value) => {
        if (value <= 0) {
            throw new Error("price must be positive.");
        }
        return true;
    }),
];
exports.PostSchema = PostSchema;
const PutSchema = [
    (0, express_validator_1.param)("id").trim().notEmpty().withMessage("id is required.").isUUID().withMessage("id must be a valid UUID."),
    (0, express_validator_1.body)("name").trim().notEmpty().withMessage("name is required."),
    (0, express_validator_1.body)("price")
        .trim()
        .notEmpty()
        .withMessage("price is required.")
        .isNumeric()
        .withMessage("price must be a number.")
        .custom((value) => {
        if (value <= 0) {
            throw new Error("price must be positive.");
        }
        return true;
    }),
];
exports.PutSchema = PutSchema;
//# sourceMappingURL=schema.js.map