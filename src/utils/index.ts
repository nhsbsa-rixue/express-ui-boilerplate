import config from "../config";

/**
 * Retrieve the path with base contextPath prepended.
 * The contextPath is defined in the config file
 *
 * @param path
 * @returns path segment with contextPath prepended
 */
export const getRequestUri = (path = "/") => {
  return (
    [config.CONTEXT_PATH, path]
      .join("/")
      // Normalize slashes and ensure leading slash
      .replace(/\/+/g, "/")
      .replace(/\/$/, "") || "/"
  );
};
