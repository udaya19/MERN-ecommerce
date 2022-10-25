const User = require("../models/user");

exports.registerUser = async (req, res) => {
  try {
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
  } catch (error) {
    return res.json(500, {
      success: false,
      error: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json(400, {
        success: false,
        error: "Please enter email and password",
      });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.json(400, {
        success: false,
        error: "Invalid email or password",
      });
    }
    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
      return res.json(400, {
        success: false,
        error: "Invalid email or password",
      });
    }
    const token = await user.getJWTToken();
    return res.cookie("token", token).json(200, {
      success: true,
      message: "login successfull",
      user,
      token,
    });
  } catch (error) {
    return res.json(500, {
      success: false,
      error: error.message,
    });
  }
};
