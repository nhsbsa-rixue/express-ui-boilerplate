import { body, param } from "express-validator";

const GetSchema = [
  param("id").trim().notEmpty().withMessage("id is required.").isUUID().withMessage("id must be a valid UUID."),
];

const DeleteSchema = [
  param("id").trim().notEmpty().withMessage("id is required.").isUUID().withMessage("id must be a valid UUID."),
];

const PostSchema = [
  body("name").trim().notEmpty().withMessage("name is required."),
  body("price")
    .trim()
    .notEmpty()
    .withMessage("price is required.")
    .isNumeric()
    .withMessage("price must be a number.")
    .custom((value) => {
      if (value <= 0) {
        throw new Error("price must be positive.");
      }
      return true;
    }),
];

const PutSchema = [
  param("id").trim().notEmpty().withMessage("id is required.").isUUID().withMessage("id must be a valid UUID."),
  body("name").trim().notEmpty().withMessage("name is required."),
  body("price")
    .trim()
    .notEmpty()
    .withMessage("price is required.")
    .isNumeric()
    .withMessage("price must be a number.")
    .custom((value) => {
      if (value <= 0) {
        throw new Error("price must be positive.");
      }
      return true;
    }),
];

export { DeleteSchema, GetSchema, PostSchema, PutSchema };
