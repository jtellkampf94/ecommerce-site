const express = require("express");

const isAuth = require("../middleware/isAuth");
const uploadController = require("../controllers/upload");

const router = express.Router();

router.get("/", isAuth, uploadController.getPresignedURL);

module.exports = router;
