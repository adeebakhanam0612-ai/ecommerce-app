const express = require("express");
const Order = require("../models/Order");

const router = express.Router();


// ✅ GET all orders (from DB)
router.get("/myorders", async (req, res) => {
  try {
    const orders = await Order.find();

    res.status(200).json({
      success: true,
      message: "Orders fetched from database",
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
    });
  }
});


// ✅ POST new order (SAVE TO DB)
router.post("/create", async (req, res) => {
  try {
    const { item, price } = req.body;

    const newOrder = new Order({
      item,
      price,
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating order",
    });
  }
});

module.exports = router;
router.delete("/delete/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Delete failed",
    });
  }
});