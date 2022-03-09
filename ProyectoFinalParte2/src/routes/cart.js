const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cart.controller')

router.get('/:id/productos',cartController.getCarrito)
router.post('/',cartController.postNewCarrito)
router.post('/:id/productos',cartController.postProductCarrito)
router.delete('/:id',cartController.deleteCarrito)
router.delete('/:id/productos/:id_prod',cartController.deleteProductOfCarrito)

module.exports = router