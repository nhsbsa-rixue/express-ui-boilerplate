import fs from "node:fs";
import path from "node:path";
import i18next from "i18next";
import Backend from "i18next-fs-backend";
import middleware from "i18next-http-middleware";
import config from "../config";

const SHARED_NAMESPACES = ["common", "error"];

const getPageNamespaces = (): string[] => {
  const pagesDir = path.join(__dirname, "../pages");
  return fs
    .readdirSync(pagesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(pagesDir, entry.name, "locales")))
    .map((entry) => entry.name);
};

const saveUserPreference: Middleware = (req, _res, next) => {
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
const setupLanguage = (app: App) => {
  const pageNamespaces = getPageNamespaces();

  i18next
    .use(Backend)
    .use(middleware.LanguageDetector)
    .init({
      preload: config.LANGUAGES,
      fallbackLng: "en",
      nsSeparator: ".",
      ns: [...SHARED_NAMESPACES, ...pageNamespaces],
      defaultNS: "",
      backend: {
        loadPath: (lng: string, ns: string) => {
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

  app.use(middleware.handle(i18next, { removeLngFromUrl: true }));
  app.use(saveUserPreference);
};

export default setupLanguage;
