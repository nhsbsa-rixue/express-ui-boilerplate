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
const pageList = [];
const pageLocalsMiddleware = (pagePath) => (req, res, next) => {
    res.locals.title = req.t(`${pagePath}.title`);
    res.renderPage = (options) => res.render(`${pagePath}/template`, options);
    res.redirectPageTo = (page) => {
        res.redirect((0, utils_1.getRequestUri)(page));
    };
    next();
};
/**
 * Derives a base path from the file path.
 * E.g., src/pages/dob/page.ts -> /dob
 */
const derivePath = (filePath) => {
    const parts = filePath.split(node_path_1.default.sep);
    const idx = parts.lastIndexOf("pages");
    const segments = parts.slice(idx + 1, parts.length - 1); // folder path
    return segments.join("/"); // simplistic; extend for dynamic params
};
const scanningPages = (baseFolder, router) => {
    // Recursively scan the pages directory
    for (const entry of node_fs_1.default.readdirSync(baseFolder, { withFileTypes: true })) {
        const subPageFolder = node_path_1.default.join(baseFolder, entry.name);
        if (entry.isDirectory()) {
            scanningPages(subPageFolder, router);
        }
        else if (entry.name.endsWith("page.ts") || entry.name.endsWith("page.js")) {
            const mod = require(subPageFolder);
            const meta = mod.default || {};
            const pagePath = meta.path || derivePath(subPageFolder);
            pageList.push({
                path: pagePath,
                title: `${pagePath}.title`,
            });
            if (typeof mod.get === "function") {
                const schema = mod.getSchema || [];
                router.get((0, utils_1.getRequestUri)(pagePath), schema, validator_1.validator, pageLocalsMiddleware(pagePath), mod.get);
            }
            if (typeof mod.post === "function") {
                const schema = mod.postSchema || [];
                router.post((0, utils_1.getRequestUri)(pagePath), schema, validator_1.validator, pageLocalsMiddleware(pagePath), mod.post);
            }
        }
    }
};
const setupAutoPages = (app) => {
    const router = express_1.default.Router();
    const pageBaseFolder = node_path_1.default.join(__dirname, "../pages");
    scanningPages(pageBaseFolder, router);
    router.get((0, utils_1.getRequestUri)(), (_req, res) => {
        res.render("home", { pageList, title: "Home" });
    });
    app.use(router);
    logger_1.default.info("Auto pages setup completed.");
};
exports.default = setupAutoPages;
//# sourceMappingURL=pages.js.map