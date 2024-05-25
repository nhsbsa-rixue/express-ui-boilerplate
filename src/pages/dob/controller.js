const GET = async (req, res) => {
  res.render("dob");
};

const POST = async (req, res) => {
  res.redirect("dob");
};

export default { GET, POST };
