const express = require("express");

const customerController = require("../controllers/customer");

const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.post("/reset-password", customerController.resetPasswordRequest);

router.get("/reset-password/:token", customerController.validateResetToken);

router.put("/reset-password", customerController.updatePassword);

router.delete("/:customerId", isAuth, customerController.deleteAccount);

router.put("/:customerId", isAuth, customerController.updateCustomer);

module.exports = router;
