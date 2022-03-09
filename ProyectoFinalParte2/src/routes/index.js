const express = require('express')
const router = express.Router()
const ProductRoutes = require('./product')
const CartRoutes = require('./cart')


router.use('/api/productos', ProductRoutes)
router.use('/api/carrito', CartRoutes)


module.exports = router
