const GET = async (req, res) => {
  return res.render("dob");
};

const POST = async (req, res) => {
  return res.redirectPageTo("dob");
};

export default { GET, POST };
