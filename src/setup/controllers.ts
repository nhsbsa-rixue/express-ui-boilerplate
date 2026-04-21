import fs from "node:fs";
import path from "node:path";
import express, { type Router } from "express";
import logger from "../logger";
import { getRequestUri } from "../utils";
import { validator } from "../validator";
type ILayer = Router["stack"][number];

const router = express.Router();

/**
 * Derives a base path from the file path.
 * E.g., src/controllers/users/userController.ts -> /users
 */
const derivePath = (filePath: string) => {
  const parts = filePath.split(path.sep);
  const idx = parts.lastIndexOf("controllers");
  const segments = parts.slice(idx + 1, parts.length - 1); // folder path
  return `/${segments.join("/")}`; // simplistic; extend for dynamic params
};

const scanningControllers = (baseFolder: string, router: express.Router) => {
  // Recursively scan the controllers directory
  for (const entry of fs.readdirSync(baseFolder, { withFileTypes: true })) {
    const subControllerFolder = path.join(baseFolder, entry.name);

    if (entry.isDirectory()) {
      scanningControllers(subControllerFolder, router);
    } else if (entry.name.endsWith("controller.ts") || entry.name.endsWith("controller.js")) {
      const mod = require(subControllerFolder);
      const meta = mod.default || {};
      const path = meta.path || derivePath(subControllerFolder);

      if (typeof mod.get === "function") {
        const schema = mod.getSchema || [];
        router.get(`${path}/:id`, schema, validator, mod.get);
      }

      if (typeof mod.list === "function") {
        router.get(path, mod.list);
      }

      if (typeof mod.post === "function") {
        const schema = mod.postSchema || [];
        router.post(path, schema, validator, mod.post);
      }

      if (typeof mod.put === "function") {
        const schema = mod.putSchema || [];
        router.put(`${path}/:id`, schema, validator, mod.put);
      }

      if (typeof mod.del === "function") {
        const schema = mod.deleteSchema || [];
        router.delete(`${path}/:id`, schema, validator, mod.del);
      }

      if (typeof mod.patch === "function") {
        const schema = mod.patchSchema || [];
        router.patch(`${path}/:id`, schema, validator, mod.patch);
      }
    }
  }
};

const setupAutoRoutes = (app: express.Application) => {
  const controllerBaseFolder = path.join(__dirname, "..", "controllers");

  scanningControllers(controllerBaseFolder, router);

  app.use(getRequestUri("/api"), router);

  router.stack.forEach((layer: ILayer) => {
    if (layer.route) {
      logger.debug(`Found /api${layer.route.path} controller`);
    }
  });
};

export default setupAutoRoutes;
