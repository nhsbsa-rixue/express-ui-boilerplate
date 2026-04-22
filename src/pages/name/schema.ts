import { body } from "express-validator";

export default [
    body("firstName")
        .trim()
        .notEmpty()
        .bail()
        .withMessage("name.firstNameRequired")
        .isLength({ max: 50 })
        .withMessage("name.firstNameMaxLength")
        .matches(/^[a-zA-Z\s']+$/)
        .withMessage("name.firstNameInvalidFormat"),
    body("lastName")
        .trim()
        .notEmpty()
        .bail()
        .withMessage("name.lastNameRequired")
        .isLength({ max: 50 })
        .withMessage("name.lastNameMaxLength")
        .matches(/^[a-zA-Z\s']+$/)
        .withMessage("name.lastNameInvalidFormat"),
];
