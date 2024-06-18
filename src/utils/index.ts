import Path from "path";
import Config from "../config";

export const resolvePath = (path: string) => {

  return Path.resolve(__dirname, path);
};

export const getContextPath = (path = "") => {
  return `${Config.CONTEXT_PATH}${path}`;
};
