import express from 'express'
import {authResolver} from '../middleware/authorization.middleware.js'
import {productosController} from '../controllers/producto.controller.js'
const router = express.Router()

router.get('/:id?',productosController.getProduct)
router.post('/',[authResolver],productosController.postProduct)
router.put('/:id',[authResolver],productosController.putProduct)
router.delete('/:id',[authResolver],productosController.deleteProduct)

export default router