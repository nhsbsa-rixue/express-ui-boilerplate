"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("../logger"));
const utils_1 = require("../utils");
const validator_1 = require("../validator");
const router = express_1.default.Router();
/**
 * Derives a base path from the file path.
 * E.g., src/controllers/users/userController.ts -> /users
 */
const derivePath = (filePath) => {
    const parts = filePath.split(node_path_1.default.sep);
    const idx = parts.lastIndexOf("controllers");
    const segments = parts.slice(idx + 1, parts.length - 1); // folder path
    return `/${segments.join("/")}`; // simplistic; extend for dynamic params
};
const scanningControllers = (baseFolder, router) => {
    // Recursively scan the controllers directory
    for (const entry of node_fs_1.default.readdirSync(baseFolder, { withFileTypes: true })) {
        const subControllerFolder = node_path_1.default.join(baseFolder, entry.name);
        if (entry.isDirectory()) {
            scanningControllers(subControllerFolder, router);
        }
        else if (entry.name.endsWith("controller.ts") || entry.name.endsWith("controller.js")) {
            const mod = require(subControllerFolder);
            const meta = mod.default || {};
            const path = meta.path || derivePath(subControllerFolder);
            if (typeof mod.get === "function") {
                const schema = mod.getSchema || [];
                router.get(`${path}/:id`, schema, validator_1.validator, mod.get);
            }
            if (typeof mod.list === "function") {
                router.get(path, mod.list);
            }
            if (typeof mod.post === "function") {
                const schema = mod.postSchema || [];
                router.post(path, schema, validator_1.validator, mod.post);
            }
            if (typeof mod.put === "function") {
                const schema = mod.putSchema || [];
                router.put(`${path}/:id`, schema, validator_1.validator, mod.put);
            }
            if (typeof mod.del === "function") {
                const schema = mod.deleteSchema || [];
                router.delete(`${path}/:id`, schema, validator_1.validator, mod.del);
            }
            if (typeof mod.patch === "function") {
                const schema = mod.patchSchema || [];
                router.patch(`${path}/:id`, schema, validator_1.validator, mod.patch);
            }
        }
    }
};
const setupAutoRoutes = (app) => {
    const controllerBaseFolder = node_path_1.default.join(__dirname, "..", "controllers");
    scanningControllers(controllerBaseFolder, router);
    app.use((0, utils_1.getRequestUri)("/api"), router);
    router.stack.forEach((layer) => {
        if (layer.route) {
            logger_1.default.debug(`Found /api${layer.route.path} controller`);
        }
    });
};
exports.default = setupAutoRoutes;
//# sourceMappingURL=controllers.js.map