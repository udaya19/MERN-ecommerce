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
router.get(
  "/all-orders",
  isAuthenticated,
  isAdmin,
  orderController.getAllOrders
);
router.post(
  "/update-order/:id",
  isAuthenticated,
  isAdmin,
  orderController.updateOrder
);
router.post(
  "/delete-order/:id",
  isAuthenticated,
  isAdmin,
  orderController.deleteOrder
);
module.exports = router;
