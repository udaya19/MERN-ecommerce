const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order");
const { isAuthenticated, isAdmin } = require("../middlewares/auth");
router.post("/create", isAuthenticated, orderController.newOrder);
router.post(
  "/get-single-order/:id",
  isAuthenticated,
  isAdmin,
  orderController.getSingleOrder
);
router.get(
  "/myOrders",
  isAuthenticated,
  orderController.getOrderOfLoggedInUser
);
module.exports = router;
