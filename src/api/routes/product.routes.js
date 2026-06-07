import { Router } from 'express'
import {
    getProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
} from '../controllers/product.controller.js'
import { validateProduct } from '../../middlewares/product.middleware.js'

const router = Router()

router.get('/', getProducts)
router.get('/:pid', validateProduct, getProductById)
router.post('/', createProduct)
router.put('/:pid', validateProduct, updateProduct)
router.delete('/:pid', validateProduct, deleteProduct)

export default router