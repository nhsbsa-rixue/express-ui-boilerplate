import express from "express";
import nunjucks from "nunjucks";
import { fileURLToPath } from "url";
import path from "path";
import config from "../config/index.js";

const setupTemplate = (app) => {
  // Set the path to the public folder
  const publicPaths = [
    "../../public",
    "../../node_modules/nhsuk-frontend/dist",
  ];

  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  publicPaths.forEach((publicPath) => {
    app.use(express.static(path.resolve(__dirname, publicPath)));
  });

  // Set the path to the page template and macros
  let templatePaths = [
    "../views",
    "../../node_modules/nhsuk-frontend/packages",
  ];
  templatePaths = templatePaths.map((templatePath) =>
    path.resolve(__dirname, templatePath),
  );

  const env = nunjucks.configure(templatePaths, {
    autoescape: true,
    express: app,
  });

  // Add all globals from config
  env.addGlobal("APP_NAME", config.APP_NAME);

  // Set the view engine to Nunjucks
  app.set("view engine", "njk");
};

export default setupTemplate;
