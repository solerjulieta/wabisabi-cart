import { Router } from 'express'
import { renderProducts, renderProductDetail } from '../controllers/views.controller.js'

const router = Router()

router.get('/products', renderProducts)
router.get('/products/:pid', renderProductDetail)

export default router