import fs from "fs";
import express from "express";
import nunjucks from "nunjucks";
import config from "../config/index.js";
import { resolvePath } from "../utils/index.js";

const getSubDirectories = (source) => {
  return fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => source + "/" + dirent.name + "/template");
};

const getTemplatePaths = () => {
  const templatePaths = [
    "../template",
    "../../node_modules/nhsuk-frontend/packages",
  ].map((templatePath) => resolvePath(templatePath));

  const subDirs = getSubDirectories(resolvePath("../pages"));

  return [...templatePaths, ...subDirs];
};

const setupTemplate = (app) => {
  // Set the path to the public folder
  const publicPaths = [
    "../../public",
    "../../node_modules/nhsuk-frontend/dist",
  ];

  publicPaths.forEach((publicPath) => {
    app.use(express.static(resolvePath(publicPath)));
  });

  // Set the path to the page template and macros
  const templatePaths = getTemplatePaths();

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
