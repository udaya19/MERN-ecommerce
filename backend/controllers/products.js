const Product = require("../models/products");
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.json(200, {
      message: "Products fetched successfully",
      success: true,
      products,
    });
  } catch (error) {
    return res.json(500, {
      error: error.message,
      success: false,
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    return res.json(200, {
      message: "Product created successfully",
      success: true,
    });
  } catch (error) {
    return res.json(500, {
      error: error.message,
      success: false,
    });
  }
};
