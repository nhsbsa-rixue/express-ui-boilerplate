import config from "../config/index.js";
import i18next from "i18next";
import middleware from "i18next-http-middleware";
import * as pages from "../pages/index.js";
import * as commonLocale from "../locales/index.js";

// Load lang locales depending on the CONFIG.LANGUAGES
const loadResources = () => {
  const resources = {};

  config.LANGUAGES.forEach((lang) => {
    resources[lang] = { translation: { ...commonLocale[lang] } };

    Object.entries(pages).forEach(([key, page]) => {
      if (page.locale) {
        resources[lang].translation[key] = page.locale[lang];
      }
    });
  });

  return resources;
};

const saveUserPreference = (req, res, next) => {
  if (req.query.lang && config.LANGUAGES.includes(req.query.lang)) {
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
  i18next.use(middleware.LanguageDetector).init({
    preload: config.LANGUAGES,
    fallbackLng: "en",
    resources: loadResources(),
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
