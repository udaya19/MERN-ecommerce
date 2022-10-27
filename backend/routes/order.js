const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order");
const { isAuthenticated } = require("../middlewares/auth");
router.post("/create", isAuthenticated, orderController.newOrder);

module.exports = router;
