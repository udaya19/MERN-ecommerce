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
