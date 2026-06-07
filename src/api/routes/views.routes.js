import { Router } from 'express'
import { renderHome, renderProducts, renderProductDetail, renderCart } from '../controllers/views.controller.js'

const router = Router()

router.get('/', renderHome)
router.get('/about', (req, res) => res.render('about'))
router.get('/products', renderProducts)
router.get('/products/:pid', renderProductDetail)
router.get('/carts/:cid', renderCart)

export default router