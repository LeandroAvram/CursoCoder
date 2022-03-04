const express = require('express')
const router = express.Router()
const frontController = require('../controllers/front.controller')

router.get('/front/productos', frontController.getProductPage)
router.get('/front/carritos', frontController.getCartPage)

module.exports = router