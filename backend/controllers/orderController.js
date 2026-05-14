const Order = require("../models/Order");


// CREATE ORDER
const createOrder = async (req, res) => {

    try {

        const { products, totalPrice } = req.body;

        const order = new Order({
            user: req.user.id,
            products,
            totalPrice
        });

        await order.save();

        res.status(201).json({
            message: "Order Placed Successfully",
            order
        });

    } catch (error) {

        res.status(500).json({
            message: "Order Creation Failed"
        });

    }
};


// GET MY ORDERS
const getMyOrders = async (req, res) => {

    try {

        const orders = await Order.find({
            user: req.user.id
        }).populate("products.product");

        res.status(200).json(orders);

    } catch (error) {

        res.status(500).json({
            message: "Failed To Fetch Orders"
        });

    }
};
const getAllOrders = async (req, res) => {

    try {

        const orders = await Order.find()
            .populate("user", "name email")
            .populate("products.product");

        res.status(200).json(orders);

    } catch (error) {

        res.status(500).json({
            message: "Failed To Fetch All Orders"
        });

    }
};
const updateOrderStatus = async (req, res) => {

    try {

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                message: "Order Not Found"
            });
        }

        order.status = req.body.status;

        await order.save();

        res.status(200).json({
            message: "Order Status Updated",
            order
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed To Update Order Status"
        });

    }
};

module.exports = {
    createOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus
};