import fs from "fs";
import express from "express";
import nunjucks from "nunjucks";
import config from "../config";
import { resolvePath, getContextPath } from "../utils";

const getSubDirectories = (source: string) => {
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

const contextPath: Handler = (req, res, next) => {
  req.CONTEXT_PATH = config.CONTEXT_PATH;
  next();
} 

const setupTemplate = (app: App) => {
  // Set the path to the public folder
  const publicPaths = [
    "../../public",
    "../../node_modules/nhsuk-frontend/dist",
  ];

  publicPaths.forEach((publicPath) => {
    app.use(getContextPath(""), express.static(resolvePath(publicPath)));
  });

  // Set the path to the page template and macros
  const templatePaths = getTemplatePaths();

  const env = nunjucks.configure(templatePaths, {
    autoescape: true,
    express: app,
  });
 
  // Add all globals from config
  env.addGlobal("APP_NAME", config.APP_NAME);
  env.addGlobal("CONTEXT_PATH", config.CONTEXT_PATH);
  app.use(contextPath);
  // Set the view engine to Nunjucks

  app.set("view engine", "njk");
};

export default setupTemplate;
