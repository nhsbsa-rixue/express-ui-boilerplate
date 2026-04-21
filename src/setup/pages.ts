import fs from "node:fs";
import path from "node:path";
import express from "express";
import logger from "../logger";
import { getRequestUri } from "../utils";
import { validator } from "../validator";

const pageList: { path: string; title: string }[] = [];

const pageLocalsMiddleware =
  (pagePath: string): Middleware =>
  (req, res, next) => {
    res.locals.title = req.t(`${pagePath}.title`);

    res.renderPage = (options?: Record<string, unknown>) => res.render(`${pagePath}/template`, options);

    res.redirectPageTo = (page: string) => {
      res.redirect(getRequestUri(page));
    };

    next();
  };

/**
 * Derives a base path from the file path.
 * E.g., src/pages/dob/page.ts -> /dob
 */
const derivePath = (filePath: string) => {
  const parts = filePath.split(path.sep);
  const idx = parts.lastIndexOf("pages");
  const segments = parts.slice(idx + 1, parts.length - 1); // folder path
  return segments.join("/"); // simplistic; extend for dynamic params
};

const scanningPages = (baseFolder: string, router: express.Router) => {
  // Recursively scan the pages directory
  for (const entry of fs.readdirSync(baseFolder, { withFileTypes: true })) {
    const subPageFolder = path.join(baseFolder, entry.name);

    if (entry.isDirectory()) {
      scanningPages(subPageFolder, router);
    } else if (entry.name.endsWith("page.ts") || entry.name.endsWith("page.js")) {
      const mod = require(subPageFolder);
      const meta = mod.default || {};
      const pagePath = meta.path || derivePath(subPageFolder);

      pageList.push({
        path: pagePath,
        title: `${pagePath}.title`,
      });

      if (typeof mod.get === "function") {
        const schema = mod.getSchema || [];

        router.get(getRequestUri(pagePath), schema, validator, pageLocalsMiddleware(pagePath), mod.get);
      }

      if (typeof mod.post === "function") {
        const schema = mod.postSchema || [];
        router.post(getRequestUri(pagePath), schema, validator, pageLocalsMiddleware(pagePath), mod.post);
      }
    }
  }
};

const setupAutoPages = (app: express.Application) => {
  const router = express.Router();

  const pageBaseFolder = path.join(__dirname, "../pages");
  scanningPages(pageBaseFolder, router);

  router.get(getRequestUri(), (_req, res) => {
    res.render("home", { pageList, title: "Home" });
  });

  app.use(router);

  logger.info("Auto pages setup completed.");
};

export default setupAutoPages;
