import { Router } from 'express'
import {
    getProducts,
    createProducts
} from '../controllers/product.controller.js'

const router = Router()

router.get('/', getProducts)
//router.get('/:id')
router.post('/', createProducts)
//router.put('/:id')
//router.delete('/:id')

export default router