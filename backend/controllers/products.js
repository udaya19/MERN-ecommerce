const Product = require("../models/products");
const ApiFeatures = require("../utils/apiFeatures");
exports.getAllProducts = async (req, res) => {
  try {
    const apiFeatures = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter();
    const products = await apiFeatures.query;
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

exports.updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.json(404, {
        error: "Product not found",
        success: false,
      });
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.json(200, {
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    return res.json(500, {
      success: false,
      error: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.json(404, {
        error: "Product not found",
        success: false,
      });
    }
    await product.remove();
    return res.json(200, {
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.json(500, {
      success: false,
      error: error.message,
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.json(404, {
        error: "Product not found",
        success: false,
      });
    }
    return res.json(200, {
      success: true,
      message: "Product details fetched successfully",
      product,
    });
  } catch (error) {
    return res.json(500, {
      success: false,
      error: error.message,
    });
  }
};
