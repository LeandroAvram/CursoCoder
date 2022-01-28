import express from 'express'
import {carritoController} from '../controllers/carrito.controller.js'

const router = express.Router()
router.get('/:id/productos',carritoController.getCarrito)
router.post('/',carritoController.postNewCarrito)
router.post('/:id/productos',carritoController.postProductCarrito)
router.delete('/:id',carritoController.deleteCarrito)
router.delete('/:id/productos/:id_prod',carritoController.deleteProductOfCarrito)

export default router