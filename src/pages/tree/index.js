import Page from "../Page.js";

export const tree = new Page({
  get: async (req, res) => res.render("tree"),
});
