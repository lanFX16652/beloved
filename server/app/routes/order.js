const express = require("express");
const orderController = require("../controllers/orderController.js")
const { loginMiddleware } = require("../middlewares/loginMiddleware.js");

const router = express.Router()

router.post("/order/create", loginMiddleware, orderController.createOrder);
router.get("/cart", loginMiddleware)

const orderRoute = router;

module.exports = orderRoute;