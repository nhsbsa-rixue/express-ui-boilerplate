import express from "express";
import logger from "../logger/index.js";
import * as pages from "../pages/index.js";

const router = express.Router();

router.get("/", (req, res) => {
  logger.info("Loading pages");
  return res.render("index", { pageList: Object.keys(pages) });
});

export default router;
