import * as chains from "./chains/index.js";
import { validationResult } from "express-validator";

const validator = (req, res, next) => {
  const { errors } = validationResult(req);

  if (!errors || errors.length === 0) {
    return next();
  }

  req.session.body = req.body;
  req.session.error = {
    errorList: errors.map((error) => ({
      text: error.msg,
      href: `#${error.path}`,
    })),
    fields: {},
  };

  errors.forEach((error) => {
    req.session.error.fields[error.path] = error.msg;
  });

  return res.redirect(req.route.path);
};

export { validator, chains };
