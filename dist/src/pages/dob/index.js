import Page from "../Page.js";
import { default as schema } from "./schema.js";
const get = async (req, res) => {
    return res.render("dob");
};
const post = async (req, res) => {
    return res.redirectPageTo("dob");
};
export const dob = new Page({
    path: "dob",
    previous: "",
    nextPage: "dob",
    heading: "DOB form validation",
    get,
    post,
    schema,
});
//# sourceMappingURL=index.js.map