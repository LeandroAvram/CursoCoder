const express = require('express')
const router = express.Router()
const frontController = require('../controllers/front.controller')

router.get('/productos', frontController.getProductPage)
router.get('/carritos', frontController.getCartPage)
router.get('/chat', frontController.getChatPage)
router.get('/chat', frontController.getChatPage)
router.post('/carritos', frontController.saveCart)
router.post('/order', frontController.orderCart)
router.delete('/carritos', frontController.deleteProductCart)

module.exports = router