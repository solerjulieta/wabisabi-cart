import { Router } from 'express'
import { 
    createCart, 
    getCartById, 
    updateCart,
    addProduct,
    deleteProduct
} from '../controllers/cart.controller.js'
import { validateCart } from '../../middlewares/cart.middleware.js'
import { validateProduct } from '../../middlewares/product.middleware.js'

const router = Router()

router.post('/', createCart)
router.get('/:cid', getCartById)
router.put('/:cid', updateCart)
router.post('/:cid/products/:pid', validateCart, validateProduct, addProduct)
router.delete('/:cid/products/:pid', validateCart, validateProduct, deleteProduct)

export default router