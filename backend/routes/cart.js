const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth");
const { addToCart, deleteItemFromCart } = require("../controllers/cart");
router.post("/add-to-cart/:id", isAuthenticated, addToCart);
router.post("/delete-from-cart/:id", isAuthenticated, deleteItemFromCart);

module.exports = router;
