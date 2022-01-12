const express = require('express')
const router = express.Router()
const carritoController = require('../controllers/carrito.controller')

router.get('/:id/productos',carritoController.getCarrito)
router.post('/',carritoController.postNewCarrito)
router.post('/:id/productos',carritoController.postProductCarrito)
router.delete('/:id',carritoController.deleteCarrito)
router.delete('/:id/productos/:id_prod',carritoController.deleteProductOfCarrito)

module.exports = router