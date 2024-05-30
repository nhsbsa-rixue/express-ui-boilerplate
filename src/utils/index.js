import Path from "path";
import { fileURLToPath } from "url";
import Config from "../config/index.js";

export const resolvePath = (path) => {
  const __dirname = Path.dirname(fileURLToPath(import.meta.url));

  return Path.resolve(__dirname, path);
};

export const getContextPath = (path = "") => {
  return `${Config.CONTEXT_PATH}${path}`;
};
