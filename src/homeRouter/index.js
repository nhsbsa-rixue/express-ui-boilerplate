import express from "express";
import logger from "../logger/index.js";
import * as pages from "../pages/index.js";

const router = express.Router();

router.get("/", (req, res) => {
  logger.info("Loading pages");
  const pageList = Object.entries(pages).map(([key, page]) => ({
    path: page.path || key,
    heading: page.heading || key,
  }));
  return res.render("home", { pageList });
});

export default router;
