const express = require("express");

const customerAuthController = require("../controllers/customerAuth");

const router = express.Router();

router.post("/register", customerAuthController.postRegister);

router.post("/login", customerAuthController.postLogin);

module.exports = router;
