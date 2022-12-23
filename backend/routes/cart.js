const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth");
const {
  addToCart,
  deleteItemFromCart,
  getCartItems,
} = require("../controllers/cart");
router.post("/add-to-cart/:id", isAuthenticated, addToCart);
router.post("/delete-from-cart/:id", isAuthenticated, deleteItemFromCart);
router.get("/user-cart", isAuthenticated, getCartItems);

module.exports = router;
