const Product = require("../models/Product");


// ADD PRODUCT
const addProduct = async (req, res) => {
    try {

        const newProduct = new Product(req.body);

        await newProduct.save();

        res.status(201).json({
            message: "Product Added Successfully",
            product: newProduct
        });

    } catch (error) {

        res.status(500).json({
            message: "Error Adding Product"
        });

    }
};


// GET ALL PRODUCTS
const getProducts = async (req, res) => {
    try {

        const products = await Product.find();

        res.status(200).json(products);

    } catch (error) {

        res.status(500).json({
            message: "Error Fetching Products"
        });

    }
};

const updateProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product Not Found"
            });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            message: "Product Updated Successfully",
            updatedProduct
        });

    } catch (error) {

        res.status(500).json({
            message: "Product Update Failed"
        });

    }
};
const deleteProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product Not Found"
            });
        }

        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Product Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Product Deletion Failed"
        });

    }
};

module.exports = {
    addProduct,
    getProducts, updateProduct, deleteProduct
};