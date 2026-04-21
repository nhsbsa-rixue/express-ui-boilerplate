import fs from "node:fs";
import path from "node:path";
import express from "express";
import nunjucks from "nunjucks";
import config from "../config";

import { getRequestUri } from "../utils";

/**
 * Get the root pages folder for Nunjucks template resolution.
 * Page templates follow the convention: pages/{page}/template.njk
 */
const getPageFolders = () => {
  return [path.join(__dirname, "../pages")];
};

/**
 * Get all the template paths for Nunjucks
 *
 * contains:
 * 1. nhsuk-frontend package
 * 2. base template in the template folder
 * 3. all the subdirectories in the pages folder
 *
 */
const getTemplatePaths = () => {
  const templatePaths = [
    path.join(__dirname, "../../src/template"),
    path.join(__dirname, "../../node_modules/nhsuk-frontend/dist/"),
    path.join(__dirname, "../../node_modules/nhsuk-frontend/dist/nhsuk"),
    path.join(__dirname, "../../node_modules/nhsuk-frontend/dist/nhsuk/components"),
    path.join(__dirname, "../../node_modules/nhsuk-frontend/dist/nhsuk/macros"),
  ];

  const pageDirs = getPageFolders();

  return [...templatePaths, ...pageDirs];
};

/**
 * Static file paths
 * Contains:
 * 1. public folder
 * 2. nhsuk-frontend package
 */
const publicPaths = [
  path.join(__dirname, "../../public"),
  path.join(__dirname, "../../node_modules/nhsuk-frontend/dist/nhsuk"),
];

const setupTemplate = (app: App) => {
  // Serve static files from the public directory
  publicPaths.forEach((publicPath) => {
    app.use(express.static(publicPath));
  });

  // Set the path to the page template and macros
  const env = nunjucks.configure(getTemplatePaths(), {
    autoescape: true,
    express: app,
  });

  // Add filters
  env.addGlobal("getRequestUri", getRequestUri);

  // Add all globals from config
  env.addGlobal("APP_NAME", config.APP_NAME);
  env.addGlobal("CONTEXT_PATH", config.CONTEXT_PATH);

  // Set the view engine to Nunjucks
  app.set("view engine", "njk");
};

export default setupTemplate;
