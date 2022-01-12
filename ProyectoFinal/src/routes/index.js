const express = require('express')
const router = express.Router()
const ProductRoutes = require('./producto')
const CarritoRoutes = require('./carrito')


router.use('/api/productos', ProductRoutes)
router.use('/api/carrito', CarritoRoutes)


module.exports = router
