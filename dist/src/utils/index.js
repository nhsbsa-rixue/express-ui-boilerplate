"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequestUri = void 0;
const config_1 = __importDefault(require("../config"));
/**
 * Retrieve the path with base contextPath prepended.
 * The contextPath is defined in the config file
 *
 * @param path
 * @returns path segment with contextPath prepended
 */
const getRequestUri = (path = "/") => {
    return ([config_1.default.CONTEXT_PATH, path]
        .join("/")
        // Normalize slashes and ensure leading slash
        .replace(/\/+/g, "/")
        .replace(/\/$/, "") || "/");
};
exports.getRequestUri = getRequestUri;
//# sourceMappingURL=index.js.map