const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");

//Si bien existe la ruta la creacion del carrito y la eliminacion
//la maneja cuando se crea el usuaio
router.post("/", cartController.postNewCarrito);
router.delete("/:id", cartController.deleteCarrito);

router.get("/:username/productos", cartController.getCarrito);
router.post("/producto", cartController.postProductCarrito);
router.delete("/id/producto", cartController.deleteProductOfCarrito);
router.delete("/vaciar/productos", cartController.emptyCart);

module.exports = router;
