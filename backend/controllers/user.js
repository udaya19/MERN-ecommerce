const User = require("../models/user");

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new User({
    name,
    email,
    password,
    avatar: { public_id: "Sample public_id", url: "Sample url" },
  });
  await newUser.save();
  res.json(200, {
    success: true,
    message: "Account created successfully",
    newUser,
  });
};
