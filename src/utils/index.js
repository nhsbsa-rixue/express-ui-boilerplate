import Path from "path";
import { fileURLToPath } from "url";

export const resolvePath = (path) => {
  const __dirname = Path.dirname(fileURLToPath(import.meta.url));

  return Path.resolve(__dirname, path);
};
