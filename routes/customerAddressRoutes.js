const express = require("express");

const customerAddressController = require("../controllers/customerAddress");

const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.get("/", isAuth, customerAddressController.getCustomerAddresses);

router.get("/:addressId", isAuth, customerAddressController.getCustomerAddress);

router.post("/", isAuth, customerAddressController.postCustomerAddress);

router.put(
  "/:addressId",
  isAuth,
  customerAddressController.updateCustomerAddress
);

router.delete(
  "/:addressId",
  isAuth,
  customerAddressController.deleteCustomerAddress
);

module.exports = router;
