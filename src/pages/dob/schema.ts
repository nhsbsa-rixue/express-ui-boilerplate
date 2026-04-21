import { body } from "express-validator";

export default [
  body("year")
    .trim()
    .notEmpty()
    .bail()
    .withMessage("dob.yearRequired")
    .isInt()
    .isLength({ min: 4, max: 4 })
    .withMessage("dob.yearLength"),
  body("month").trim().notEmpty().withMessage("dob.monthRequired"),
  body("day").trim().notEmpty().withMessage("dob.dayRequired"),
];
