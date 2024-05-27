import fs from "fs";
import path from "path";
import express from "express";
import nunjucks from "nunjucks";
import { fileURLToPath } from "url";
import config from "../config/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getSubDirectories = (source) => {
  return fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => path.resolve(source, dirent.name));
};

const getTemplatePaths = () => {
  const templatePaths = [
    "../template",
    "../../node_modules/nhsuk-frontend/packages",
  ].map((templatePath) => path.resolve(__dirname, templatePath));

  const subDirs = getSubDirectories(path.resolve(__dirname, "../pages"));

  return [...templatePaths, ...subDirs];
};

const setupTemplate = (app) => {
  // Set the path to the public folder
  const publicPaths = [
    "../../public",
    "../../node_modules/nhsuk-frontend/dist",
  ];

  publicPaths.forEach((publicPath) => {
    app.use(express.static(path.resolve(__dirname, publicPath)));
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
