const express = require("express");

const adminAuthController = require("../controllers/adminAuth");

const router = express.Router();

router.post("/login", adminAuthController.postLoginAdmin);

router.post("/register", adminAuthController.postRegisterAdmin);

module.exports = router;
