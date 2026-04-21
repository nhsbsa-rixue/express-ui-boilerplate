import Schema from "./schema";
import PATHS from "../paths";

export const get: Controller = async (_req, res, _next) => {
  return res.renderPage();
};

export const post: Controller = async (_req, res, _next) => {
  return res.redirectPageTo(PATHS.DOB);
};

export const postSchema = Schema;

export default {
  path: PATHS.DOB,
  get,
  post,
  postSchema: Schema,
};
