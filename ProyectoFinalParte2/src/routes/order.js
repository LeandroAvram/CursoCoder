const express = require('express')
const router = express.Router()
const orderController = require('../controllers/order.controller')

router.get('/:id?', orderController.getProduct)
router.post('/', orderController.postProduct)

module.exports = router