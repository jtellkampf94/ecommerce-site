const express = require("express");
const router = express.Router();

const isAuth = require("../middleware/isAuth");
const orderController = require("../controllers/order");

router.get("/", isAuth, orderController.getOrders);

router.get("/:orderId", isAuth, orderController.getOrder);

module.exports = router;
