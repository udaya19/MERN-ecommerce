const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products");
const { isAuthenticated, isAdmin } = require("../middlewares/auth");

router.get(
  "/allProducts",
  isAuthenticated,
  isAdmin,
  productsController.getAllProducts
);
router.post("/create", isAuthenticated, productsController.createProduct);
router.post("/update/:id", isAuthenticated, productsController.updateProduct);
router.delete("/delete/:id", isAuthenticated, productsController.deleteProduct);
router.post(
  "/get-product-by-id/:id",
  isAuthenticated,
  productsController.getProductById
);
module.exports = router;
