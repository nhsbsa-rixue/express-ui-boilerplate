import PATHS from "../paths";
import Schema from "./schema";

export const get: Controller = async (_req, res, _next) => {
  return res.renderPage();
};

export const post: Controller = async (_req, res, _next) => {
  return res.redirectPageTo(PATHS.NAME);
};

export const postSchema = Schema;

export default {
  path: PATHS.NAME,
  get,
  post,
  postSchema: Schema,
};
