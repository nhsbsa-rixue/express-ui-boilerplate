import { validationResult, FieldValidationError} from "express-validator";

const validator = (req: Request, res, next) => {
  
  const errors = validationResult(req).array() as FieldValidationError[];

  if (!errors || errors.length === 0) {
    return next();
  }

  req.session.body = req.body;
  req.session.error = {
    errorList: errors.map((error) => ({
      text: req.t(error.msg),
      href: `#${error.path}`,
    })),
    fields: {},
  };

  errors.forEach((error) => {
    req.session.error.fields[error.path] = error.msg;
  });

  return res.redirect(req.route.path);
};

export { validator };
