import express from "express";

import { getContextPath } from "../utils/index.js";
import * as pages from "../pages/index.js";
import { validator } from "../validator/index.js";

const router = express.Router();

const homePage = (req, res) => {
  const pageList = Object.entries(pages).map(([key, page]) => ({
    path: page.path || key,
    heading: page.heading || key,
  }));
  return res.render("home", { pageList });
};

// Redirect to a page with CONTEXT_PATH
// Usage res.redirectPageTo("page")
const redirectPageTo = (req, res, next) => {
  res.redirectPageTo = (page) => {
    res.redirect(getContextPath(page));
  };
  next();
};

const setupPages = (app) => {
  // Register the home page
  router.get(getContextPath(), homePage);

  // Register all the pages
  Object.entries(pages).forEach(([key, page]) => {
    const { path, controller, schema } = page;

    const pagePath = path || key;
    if (controller.GET) {
      router.get(getContextPath(pagePath), controller.GET);
    }

    if (controller.POST) {
      router.post(getContextPath(pagePath), schema, validator, controller.POST);
    }
  });
  // Add the redirectPageTo function to the response
  app.use(redirectPageTo);
  app.use(router);
};

export default setupPages;
