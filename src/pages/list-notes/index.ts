import { body } from "express-validator";

export const listNotes: Page = {
  path: "notes",
  schema: [
    body("note").trim().notEmpty().withMessage("Enter a note"),
    body("partMonth").trim().notEmpty().withMessage("Select a month"),
  ],
  get: async (req, res) => {
    const date = new Date();

    const dateList = Array.from([1, 2, 3, 4, 5])
      .map((numberOfMonth) => {
        const month = new Date();
        month.setMonth(date.getMonth() - numberOfMonth);
        return month.toISOString().slice(0, 7).replace("-", "");
      })
      .map((partMonth) => ({
        text: partMonth,
        value: partMonth,
      }));

    const notes = await req.apiClient.makeRequest({
      url: "/notes",
      method: "GET",
    });
    res.render("notes", { notes, dateList });
  },

  post: async (req, res) => {
    const { note, partMonth } = req.body;
    await req.apiClient.makeRequest({
      url: "/notes",
      method: "POST",
      data: {
        partMonth,
        odsCode: "FAAAA",
        note,
      },
    });
    res.redirect("/notes");
  },
};
