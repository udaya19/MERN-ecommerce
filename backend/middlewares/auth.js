const jwt = require("jsonwebtoken");
const User = require("../models/user");
exports.isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.json(401, {
      success: false,
      error: "Please login to access this resource",
    });
  }
  const decodedData = jwt.verify(token, process.env.JWTSECRET);
  const user = await User.findById(decodedData.id);
  console.log(user);
  req.user = user;
  next();
};

exports.isAdmin = async (req, res, next) => {
  const { user } = req;
  if (user.role !== "admin") {
    return res.json(401, {
      error: "Unauthorized access",
    });
  }
  next();
};
