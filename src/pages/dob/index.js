import Page from "../Page.js";

import { default as controller } from "./controller.js";
import { default as schema } from "./schema.js";
import * as locales from "./locales/index.js";

export const dob = new Page({
  path: "dob",
  heading: "DOB form validation",
  controller,
  locaes: locales,
  schema,
});
