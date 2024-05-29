import express from "express";

import * as pages from "../pages/index.js";
import { validator } from "../validator/index.js";

const router = express.Router();

router.get("/", (req, res) => {
  const pageList = Object.entries(pages).map(([key, page]) => ({
    path: page.path || key,
    heading: page.heading || key,
  }));
  return res.render("home", { pageList });
});

const setupPages = (app) => {
  Object.entries(pages).forEach(([key, page]) => {
    const { path, controller, schema } = page;

    const pagePath = path || key;

    if (controller.GET) router.get("/" + pagePath, controller.GET);
    if (controller.POST)
      router.post("/" + pagePath, schema, validator, controller.POST);
  });

  app.use(router);
};

export default setupPages;
