import Page from "../Page.js";

export const waterfall = new Page({
  path: "waterfall-display",
  get: (req, res) => res.render("waterfall"),
});
