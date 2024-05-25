const GET = async (req, res) => {
  res.render("home");
};

const POST = async (req, res) => {
  res.redirect("home");
};

export default { GET, POST };
