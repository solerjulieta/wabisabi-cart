import { Router } from 'express'

const router = Router()

router.post('/')
router.get('/:cid')
router.post('/:cid/products/:pid')

export default router