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
  if (user.role === "admin") {
    next();
  } else {
    return res.json(403, {
      error: "Admin access denied",
      success: false,
    });
  }
};
