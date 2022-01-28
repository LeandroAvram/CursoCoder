import express from 'express'
import ProductRoutes from './producto.js'
import CarritoRoutes from './carrito.js'

const router = express.Router()

router.use('/api/productos', ProductRoutes)
router.use('/api/carrito', CarritoRoutes)

export default router
