const express = require("express");

const paymentController = require("../controllers/payment");

const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.post("/", isAuth, paymentController.postPayment);

module.exports = router;
