import { body } from "express-validator";

export default [
  body("firstName").trim().notEmpty().withMessage("name.firstNameRequired"),
  body("lastName").trim().notEmpty().withMessage("name.lastNameRequired"),
];
