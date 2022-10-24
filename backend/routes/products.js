const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products");

router.get("/allProducts", productsController.getAllProducts);

module.exports = router;
