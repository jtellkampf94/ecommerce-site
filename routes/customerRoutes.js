const express = require("express");

const customerController = require("../controllers/customer");

const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.put("/:customerId", isAuth, customerController.updateCustomer);

router.post("/reset-password", customerController.resetPasswordRequest);

router.get("/reset-password", customerController.validateResetToken);

router.put("/reset-password", customerController.updatePassword);

router.delete("/customerId", isAuth, customerController.deleteCustomer);

module.exports = router;
