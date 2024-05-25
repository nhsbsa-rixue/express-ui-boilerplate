import config from "../config/index.js";
import i18next from "i18next";
import middleware from "i18next-http-middleware";
import * as pages from "../pages/index.js";
import * as commonLocale from "../locales/index.js";

const loadResources = () => {
  const en = { translation: { ...commonLocale.en } };
  const cy = { translation: { ...commonLocale.cy } };
  Object.entries(pages).forEach(([key, page]) => {
    if (page.locale) {
      en.translation[key] = page.locale.en;
      cy.translation[key] = page.locale.cy;
    }
  });
  return { en, cy };
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
