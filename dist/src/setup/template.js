"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const express_1 = __importDefault(require("express"));
const nunjucks_1 = __importDefault(require("nunjucks"));
const config_1 = __importDefault(require("../config"));
const utils_1 = require("../utils");
/**
 * Get the root pages folder for Nunjucks template resolution.
 * Page templates follow the convention: pages/{page}/template.njk
 */
const getPageFolders = () => {
    return [node_path_1.default.join(__dirname, "../pages")];
};
/**
 * Get all the template paths for Nunjucks
 *
 * contains:
 * 1. nhsuk-frontend package
 * 2. base template in the template folder
 * 3. all the subdirectories in the pages folder
 *
 */
const getTemplatePaths = () => {
    const templatePaths = [
        node_path_1.default.join(__dirname, "../../src/template"),
        node_path_1.default.join(__dirname, "../../node_modules/nhsuk-frontend/dist/"),
        node_path_1.default.join(__dirname, "../../node_modules/nhsuk-frontend/dist/nhsuk"),
        node_path_1.default.join(__dirname, "../../node_modules/nhsuk-frontend/dist/nhsuk/components"),
        node_path_1.default.join(__dirname, "../../node_modules/nhsuk-frontend/dist/nhsuk/macros"),
    ];
    const pageDirs = getPageFolders();
    return [...templatePaths, ...pageDirs];
};
/**
 * Static file paths
 * Contains:
 * 1. public folder
 * 2. nhsuk-frontend package
 */
const publicPaths = [
    node_path_1.default.join(__dirname, "../../public"),
    node_path_1.default.join(__dirname, "../../node_modules/nhsuk-frontend/dist/nhsuk"),
];
const setupTemplate = (app) => {
    // Serve static files from the public directory
    publicPaths.forEach((publicPath) => {
        app.use(express_1.default.static(publicPath));
    });
    // Set the path to the page template and macros
    const env = nunjucks_1.default.configure(getTemplatePaths(), {
        autoescape: true,
        express: app,
    });
    // Add filters
    env.addGlobal("getRequestUri", utils_1.getRequestUri);
    // Add all globals from config
    env.addGlobal("APP_NAME", config_1.default.APP_NAME);
    env.addGlobal("CONTEXT_PATH", config_1.default.CONTEXT_PATH);
    // Set the view engine to Nunjucks
    app.set("view engine", "njk");
};
exports.default = setupTemplate;
//# sourceMappingURL=template.js.map