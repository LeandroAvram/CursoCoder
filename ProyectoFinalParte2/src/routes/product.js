const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const authResolver = require("../middleware/authorization.middleware");

router.get("/:id?", productController.getProduct);
router.post("/", [authResolver], productController.postProduct);
router.put("/:id", [authResolver], productController.putProduct);
router.delete("/:id", [authResolver], productController.deleteProduct);

module.exports = router;
