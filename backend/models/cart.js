const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema(
  {
    cartItems: [
      {
        productName: String,
        productPrice: String,
        productQuantity: String,
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
