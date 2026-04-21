import { body } from "express-validator";

const PostSchema = [
  body("productId").trim().notEmpty().withMessage("productId is required."),
  body("userEmail").trim().isEmail().withMessage("Valid userEmail is required."),
  body("desiredPrice").trim().notEmpty().withMessage("desiredPrice is required."),
  body("alertBy24Hours").optional().trim().isBoolean().withMessage("fullDayAlert must be a boolean."),
  body("alertMorning").optional().trim().isBoolean().withMessage("morningAlert must be a boolean."),
  body("alertByNight").optional().trim().isBoolean().withMessage("nightAlert must be a boolean."),
];

export { PostSchema };
