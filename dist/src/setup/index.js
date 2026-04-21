"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = __importDefault(require("./controllers"));
const db_client_1 = __importDefault(require("./db-client"));
const error_handler_1 = __importDefault(require("./error-handler"));
const language_1 = __importDefault(require("./language"));
const pages_1 = __importDefault(require("./pages"));
const parser_1 = __importDefault(require("./parser"));
const security_1 = __importDefault(require("./security"));
const session_1 = __importDefault(require("./session"));
const template_1 = __importDefault(require("./template"));
/**
 * 1. Configure to load heavy sync tasks once
 * 2. Register router here so handler can reuse those task
 *
 * @param {ExpressApp} app
 *
 */
exports.default = (app) => {
    (0, security_1.default)(app);
    (0, parser_1.default)(app);
    (0, session_1.default)(app);
    (0, db_client_1.default)(app);
    (0, template_1.default)(app);
    (0, language_1.default)(app);
    (0, controllers_1.default)(app);
    (0, pages_1.default)(app);
    // make sure this is the last one
    (0, error_handler_1.default)(app);
};
//# sourceMappingURL=index.js.map