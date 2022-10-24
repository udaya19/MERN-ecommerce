const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products");

router.get("/allProducts", productsController.getAllProducts);
router.post("/create", productsController.createProduct);
router.post("/update/:id", productsController.updateProduct);
router.delete("/delete/:id", productsController.deleteProduct);
module.exports = router;
