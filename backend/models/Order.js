const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    item: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;