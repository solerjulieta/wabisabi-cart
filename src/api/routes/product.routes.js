import { Router } from 'express'
import {
    getProducts
} from '../controllers/product.controller.js'

const router = Router()

router.get('/', getProducts)
router.get('/:id')
router.post('/')
router.put('/:id')
router.delete('/:id')

export default router