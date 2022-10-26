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
router.post(
  "/update-user-role",
  isAuthenticated,
  isAdmin,
  userController.updateUserRole
);
router.post(
  "/update-user-role/:id",
  isAuthenticated,
  isAdmin,
  userController.updateUserRole
);
router.post(
  "/delete-user/:id",
  isAuthenticated,
  isAdmin,
  userController.deleteUser
);
module.exports = router;
