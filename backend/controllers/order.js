const Order = require("../models/order");
const Product = require("../models/products");

exports.newOrder = async (req, res) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;
    const newOrder = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });
    return res.json(200, {
      success: true,
      message: "Order created succesfully",
    });
  } catch (error) {
    return res.json(500, {
      success: false,
      error: error.message,
    });
  }
};

//admin access
exports.getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!order) {
      return res.json(200, {
        success: false,
        error: "Order not found",
      });
    }
    return res.json(200, {
      success: true,
      order,
    });
  } catch (error) {
    return res.json(500, {
      success: false,
      error: error.message,
    });
  }
};

exports.getOrderOfLoggedInUser = async (req, res) => {
  try {
    const order = await Order.find({ user: req.user._id });
    if (order.length === 0) {
      return res.json(404, {
        success: false,
        error: "No orders to show",
      });
    }
    return res.json(200, {
      success: true,
      order,
    });
  } catch (error) {
    return res.json(500, {
      success: false,
      error: error.message,
    });
  }
};
