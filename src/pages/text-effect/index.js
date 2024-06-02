import Page from "../Page.js";

export const textEffect = new Page({
  path: "text-effect",
  heading: "Text Effect",
  get: (req, res) => res.render("textEffect"),
});
