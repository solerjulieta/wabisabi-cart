import { Router } from 'express'
import {
    getProducts,
    createProduct,
    getProductById,
    updateProduct
} from '../controllers/product.controller.js'

const router = Router()

router.get('/', getProducts)
router.get('/:id', getProductById)
router.post('/', createProduct)
router.put('/:id', updateProduct)
//router.delete('/:id')

export default router