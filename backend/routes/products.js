const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products");

router.get("/allProducts", productsController.getAllProducts);
router.post("/create", productsController.createProduct);

module.exports = router;
