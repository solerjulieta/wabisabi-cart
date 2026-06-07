import { Router } from 'express'
import { renderProducts, renderProductDetail, renderCart } from '../controllers/views.controller.js'

const router = Router()

router.get('/products', renderProducts)
router.get('/products/:pid', renderProductDetail)
router.get('/carts/:cid', renderCart)

export default router