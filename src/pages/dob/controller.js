const GET = async (req, res) => {

  return res.render("dob");
};

const POST = async (req, res) => {

  console.log('================');

  return res.redirect("/myapp/dob");
};

export default { GET, POST };
