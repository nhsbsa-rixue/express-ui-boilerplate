import config from "../config/index.js";
import { en, cy } from "../locales/index.js";
import i18next from "i18next";
import middleware from "i18next-http-middleware";

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
    resources: {
      en,
      cy,
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
