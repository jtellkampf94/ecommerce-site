const express = require("express");

const customerController = require("../controllers/customer");

const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.put("/:customerId", isAuth, customerController.updateCustomer);

router.put("/reset-password", isAuth, customerController.resetPassword);

router.delete("/customerId", isAuth, customerController.deleteCustomer);

module.exports = router;
