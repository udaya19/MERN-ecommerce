const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/logout", userController.logoutUser);
router.post("/forgot-password", userController.forgotPassword);
router.post("/password/reset/:token", userController.resetPassword);
module.exports = router;
