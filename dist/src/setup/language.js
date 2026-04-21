"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const i18next_1 = __importDefault(require("i18next"));
const i18next_fs_backend_1 = __importDefault(require("i18next-fs-backend"));
const i18next_http_middleware_1 = __importDefault(require("i18next-http-middleware"));
const config_1 = __importDefault(require("../config"));
const SHARED_NAMESPACES = ["common", "error"];
const getPageNamespaces = () => {
    const pagesDir = node_path_1.default.join(__dirname, "../pages");
    return node_fs_1.default
        .readdirSync(pagesDir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory() && node_fs_1.default.existsSync(node_path_1.default.join(pagesDir, entry.name, "locales")))
        .map((entry) => entry.name);
};
const saveUserPreference = (req, _res, next) => {
    if (req.query.lang) {
        req.session.lang = req.query.lang;
    }
    if (req.session.lang) {
        req.i18n.changeLanguage(req.session.lang);
    }
    next();
};
/**
 * Setup language for the application
 * @param {*} app
 */
const setupLanguage = (app) => {
    const pageNamespaces = getPageNamespaces();
    i18next_1.default
        .use(i18next_fs_backend_1.default)
        .use(i18next_http_middleware_1.default.LanguageDetector)
        .init({
        preload: config_1.default.LANGUAGES,
        fallbackLng: "en",
        nsSeparator: ".",
        ns: [...SHARED_NAMESPACES, ...pageNamespaces],
        defaultNS: "",
        backend: {
            loadPath: (lng, ns) => {
                if (SHARED_NAMESPACES.includes(ns)) {
                    return `src/locales/${lng}/${ns}.json`;
                }
                return `src/pages/${ns}/locales/${lng}.json`;
            },
        },
        detection: {
            order: ["querystring", "cookie", "header"],
            lookupQuerystring: "lang",
            lookupCookie: "lang",
            caches: ["cookie"],
        },
    });
    app.use(i18next_http_middleware_1.default.handle(i18next_1.default, { removeLngFromUrl: true }));
    app.use(saveUserPreference);
};
exports.default = setupLanguage;
//# sourceMappingURL=language.js.map