const express = require("express");

const productController = require("../controllers/product");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.get("/product/:productId", productController.getProduct);

router.get("/", productController.getProducts);

router.get("/:category", productController.getProductsByCategory);

router.post("/", isAuth, productController.postProduct);

router.put("/product/:productId", isAuth, productController.updateProduct);

router.delete("/product/:productId", isAuth, productController.deleteProduct);

module.exports = router;
