import { body } from "express-validator";

export const schema = [
  body("year")
    .trim()
    .notEmpty()
    .bail()
    .withMessage("dob.dayRequired")
    .isInt()
    .isLength({ min: 4, max: 4 })
    .withMessage("dob.yearLegnth"),
  body("month").trim().notEmpty().withMessage("dob.monthRequired"),
  body("day").trim().notEmpty().withMessage("dob.yearRequired"),
];
