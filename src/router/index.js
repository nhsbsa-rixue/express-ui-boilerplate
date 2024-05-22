import express from "express";
import logger from "../logger/index.js";
import { validator, chains } from "../validator/index.js";

const router = express.Router();

router.get("/", (req, res) => {
  logger.info("First page");
  return res.render("index", { title: "First page" });
});

router.post("/", chains.DOB, validator, (req, res) => {
  return res.redirect("/");
});

export default router;
