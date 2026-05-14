const express = require("express");

const router = express.Router();

const {
    protect,
    admin
} = require("../middleware/authMiddleware");

const {
    addProduct,
    getProducts,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");


// ADD PRODUCT
router.post("/add", protect, admin, addProduct);


// GET PRODUCTS
router.get("/", getProducts);


// UPDATE PRODUCT
router.put("/update/:id", protect, admin, updateProduct);


// DELETE PRODUCT
router.delete("/delete/:id", protect, admin, deleteProduct);


module.exports = router;