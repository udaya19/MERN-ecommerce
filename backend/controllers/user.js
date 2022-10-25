const User = require("../models/user");
const crypto = require("crypto");
const sendMail = require("../utils/sendEmail");
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

exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json(200, {
      success: true,
      message: "Logout successfull",
    });
  } catch (error) {
    return res.json(500, {
      success: false,
      error: error.message,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.json(404, {
        success: false,
        error: "User not found",
      });
    }
    const resetToken = await user.getResetPasswordToken();
    await user.save();
    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/users/password/reset/${resetToken}`;
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
    await sendMail({
      email: user.email,
      subject: "Password recovery url",
      message,
    });
    return res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    return res.json(500, {
      success: false,
      error: error.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
    console.log(resetPasswordToken);
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      return res.json(404, {
        success: false,
        error: "User not found",
      });
    }
    if (req.body.password !== req.body.confirmPassword) {
      return res.json(400, {
        success: false,
        error: "Password and confirm password must be same",
      });
    }
    user.password = req.body.password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save();
    res.json(200, {
      success: true,
      message: "Password changed succesfully",
    });
  } catch (error) {
    return res.json(500, {
      success: false,
      error: error.message,
    });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    return res.json(200, {
      success: true,
      user,
    });
  } catch (error) {
    return res.json(500, {
      success: false,
      error: error.message,
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user?.id).select("+password");
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    const isMatched = await user.comparePassword(oldPassword);
    if (!isMatched) {
      return res.json(400, {
        success: false,
        error: "Invalid password",
      });
    }
    if (newPassword !== confirmNewPassword) {
      return res.json(400, {
        success: false,
        error: "Confirm password and password must be the same",
      });
    }
    user.password = newPassword;
    await user.save();
    return res.json(200, {
      success: true,
      message: "Password updated succesfully",
    });
  } catch (error) {
    return res.json(500, {
      success: false,
      error: error.message,
    });
  }
};
