import { schema } from "./schema";

const get = async (req, res) => {
  return res.render("dob");
};

const post = async (req, res) => {
  return res.redirectPageTo("dob");
};

export const dob: Page = {
  path: "dob",
  heading: "DOB form validation",
  get,
  post,
  schema,
};
