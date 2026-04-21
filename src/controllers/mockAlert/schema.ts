import { body } from "express-validator";

const PostSchema = [
  body("alertType").isIn(["day", "night", "fullDay"]).withMessage("Alert type must be one of: day, night, fullDay"),
];

export { PostSchema };
