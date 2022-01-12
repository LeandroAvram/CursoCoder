const express = require('express')
const router = express.Router()
const productosController = require('../controllers/producto.controller')
const authResolver = require('../middleware/authorization.middleware')

router.get('/:id?',productosController.getProduct)
router.post('/',[authResolver],productosController.postProduct)
router.put('/:id',[authResolver],productosController.putProduct)
router.delete('/:id',[authResolver],productosController.deleteProduct)

module.exports = router