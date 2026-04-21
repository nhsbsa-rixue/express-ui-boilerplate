"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
/**
 * Setup parsers for the applcation
 * @param {*} app
 */
const setupParser = (app) => {
    // create application/x-www-form-urlencoded parser
    app.use(body_parser_1.default.urlencoded({ extended: false }));
    app.use(body_parser_1.default.json());
};
exports.default = setupParser;
//# sourceMappingURL=parser.js.map