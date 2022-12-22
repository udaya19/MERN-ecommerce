const Product = require("../models/products");
const User = require("../models/user");
const Cart = require("../models/cart");
exports.addToCart = async (req, res) => {
  try {
    const { productName, productQuantity, productPrice } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }
    if (productQuantity > product.stock) {
      return res.status(400).json({
        success: false,
        error: "Product limit reached",
      });
    }
    const user = await User.findById(req.user._id);
    if (user.cart) {
      const cart = await Cart.findById(user.cart);
      const ifProductExists = cart.cartItems.filter(
        (cartItem) =>
          cartItem["productId"].toString() === product._id.toString()
      );
      if (ifProductExists.length > 0) {
        return res.json({
          product,
          message: "Product already added to cart",
        });
      } else {
        cart.cartItems.push({
          productId: product._id,
          productName: product.name,
          productPrice: product.price,
          productQuantity: req.body.productQuantity,
        });
        await cart.save();
        return res.json({
          success: true,
          message: "Cart updated, new product added",
        });
      }
    }

    const cart = new Cart({
      userId: user._id,
    });
    cart.cartItems.push({
      productName: product.name,
      productPrice: product.price,
      productQuantity: productQuantity,
      productId: product._id,
    });

    await cart.save();
    user.cart = cart._id;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Cart saved successfully",
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteItemFromCart = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const user = await User.findById(req.user._id);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }
    if (user.cart) {
      const cart = await Cart.findById(user.cart);
      // const index = cart.cartItems.indexOf({ productId: product._id });
      //a.findIndex(x => x.prop2 ==="yutu");
      const index = cart.cartItems.findIndex(
        (cartItem) => cartItem.productId.toString() === product._id.toString()
      );
      if (index === -1) {
        return res.json(400, {
          success: false,
          error: "Product not found in cart",
        });
      } else {
        cart.cartItems.splice(index, 1);
        await cart.save();
        return res.json(200, {
          success: true,
          message: "Product deleted from cart",
        });
      }
    }
  } catch (error) {
    return res.json(500, {
      success: false,
      error: error.message,
    });
  }
};
