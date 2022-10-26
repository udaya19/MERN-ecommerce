const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const { isAuthenticated, isAdmin } = require("../middlewares/auth");
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/logout", userController.logoutUser);
router.post("/forgot-password", userController.forgotPassword);
router.post("/password/reset/:token", userController.resetPassword);
router.get("/me", isAuthenticated, userController.getUserDetails);
router.post("/update/password", isAuthenticated, userController.updatePassword);
router.post("/update-profile", isAuthenticated, userController.updateProfile);
router.get("/all-users", isAuthenticated, isAdmin, userController.getAllUsers);
router.post(
  "/single-user/:id",
  isAuthenticated,
  isAdmin,
  userController.getSingleUser
);
module.exports = router;
