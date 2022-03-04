const express = require('express')
const router = express.Router()
const ProductRoutes = require('./product')
const CartRoutes = require('./cart')
const LoginRoutes = require('./login')
const FrontRoutes = require('./front')
const authResolverFront = require('../middleware/authFront.middleware')


router.use('/api/productos', ProductRoutes)
router.use('/api/carrito', CartRoutes)
router.use('/api/login', LoginRoutes)
router.use('/',[authResolverFront],FrontRoutes )

module.exports = router
