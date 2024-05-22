import { body } from "express-validator";

const DOB = [
  body("year")
    .trim()
    .notEmpty()
    .bail()
    .withMessage("year is required.")
    .isInt()
    .isLength({ min: 4, max: 4 })
    .withMessage("year must be 4 digits long."),
  body("month").trim().notEmpty().withMessage("month is required."),
  body("day").trim().notEmpty().withMessage("day is required."),
];

export { DOB };
