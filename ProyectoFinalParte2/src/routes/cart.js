const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cart.controller')

//visto
router.get('/:username/productos',cartController.getCarrito)
//visto
router.post('/',cartController.postNewCarrito)
//visto
router.post('/producto',cartController.postProductCarrito)
//visto
router.delete('/:id',cartController.deleteCarrito)
//visto
router.delete('/id/producto',cartController.deleteProductOfCarrito)
//visto
router.delete('/vaciar/productos', cartController.emptyCart)

module.exports = router