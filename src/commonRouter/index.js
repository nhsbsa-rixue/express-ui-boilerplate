import express from "express";
import logger from "../logger/index.js";

const router = express.Router();

router.get("/", (req, res) => {
  logger.info("First page");
  return res.render("index", { title: "First page" });
});

export default router;
