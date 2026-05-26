import { Router } from 'express'
import { createCart, getCartById } from '../controllers/cart.controller.js'

const router = Router()

router.post('/', createCart)
router.get('/:cid', getCartById)
//router.post('/:cid/products/:pid')

export default router