const express = require("express");
const productController = require("../controllers/productController.js");

const router = express.Router();

router.post("/add-product", productController.addNewProduct)

const productRoute = router;

module.exports = productRoute;
