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

//admin access
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    let totalAmount = 0;
    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });
    return res.status(200).json({
      success: true,
      totalAmount,
      orders,
    });
  } catch (error) {
    return res.json(500, {
      success: false,
      error: error.message,
    });
  }
};

//admin access
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.json(404, {
        success: false,
        error: "Order not found",
      });
    }
    if (order.orderStatus === "Delivered") {
      return res.json(400, {
        success: false,
        error: "You already delivered this product",
      });
    }
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
    order.orderStatus = req.body.status;
    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }
    await order.save();
    return res.json(200, {
      success: true,
      message: "Order updated succesfully",
    });
  } catch (error) {
    return res.json(500, {
      success: false,
      error: error.message,
    });
  }
};

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock = product.stock - quantity;
  await product.save();
}

//admin access

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.json(404, {
        success: false,
        error: "Order not found",
      });
    }
    await order.remove();
    return res.json(200, {
      success: true,
      message: "Order deleted succesfully",
    });
  } catch (error) {
    return res.json(500, {
      error: error.message,
      success: false,
    });
  }
};
