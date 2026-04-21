"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSchema = exports.post = exports.get = void 0;
const schema_1 = __importDefault(require("./schema"));
const paths_1 = __importDefault(require("../paths"));
const get = async (_req, res, _next) => {
    return res.renderPage();
};
exports.get = get;
const post = async (_req, res, _next) => {
    return res.redirectPageTo(paths_1.default.NAME);
};
exports.post = post;
exports.postSchema = schema_1.default;
exports.default = {
    get: exports.get,
    post: exports.post,
    postSchema: schema_1.default,
};
//# sourceMappingURL=page.js.map