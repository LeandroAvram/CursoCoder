const express = require('express')
const router = express.Router()
const ProductRoutes = require('./product')
const CartRoutes = require('./cart')
const LoginRoutes = require('./login')
const FrontRoutes = require('./front')
const OrderRoutes = require('./order')
const authResolverFront = require('../middleware/authFront.middleware')
const frontController = require("../controllers/front.controller")


router.use('/api/productos', ProductRoutes)
router.use('/api/carrito', CartRoutes)
router.use('/api/login', LoginRoutes)
router.use('/api/order', OrderRoutes)
router.use('/',[authResolverFront],FrontRoutes )

module.exports = router
