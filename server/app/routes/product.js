const express = require("express");
const productController = require("../controllers/productController.js");

const router = express.Router();

router.post("/add-product", productController.addNewProduct);
router.get("/product-list", productController.getProducts)

const productRoute = router;

module.exports = productRoute;
