const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");

router.get("/:username/productos", cartController.getCarrito);
router.post("/", cartController.postNewCarrito);
router.post("/producto", cartController.postProductCarrito);
router.delete("/:id", cartController.deleteCarrito);
router.delete("/id/producto", cartController.deleteProductOfCarrito);
router.delete("/vaciar/productos", cartController.emptyCart);

module.exports = router;
