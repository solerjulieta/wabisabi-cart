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
router.get('/:id', validateProduct, getProductById)
router.post('/', createProduct)
router.put('/:id', validateProduct, updateProduct)
router.delete('/:id', validateProduct, deleteProduct)

export default router