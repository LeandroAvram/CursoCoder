const express = require('express')
const router = express.Router()
const frontController = require('../controllers/front.controller')

router.get('/front/productos', frontController.getProductPage)
router.get('/front/carritos', frontController.getCartPage)
router.get('/front/chat', frontController.getChatPage)
router.post('/front/carritos', frontController.saveCart)
router.post('/front/order', frontController.orderCart)
router.delete('/front/carritos', frontController.deleteProductCart)
router.get('/front/infoServer',frontController.getInfoServer )

module.exports = router