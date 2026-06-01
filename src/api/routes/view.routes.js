import { Router } from 'express'
import Product from '../../models/product.model.js'

const router = Router()

router.get('/', async (req, res) => {
    try {
        const categories = ['Ropa', 'Cerámica']

        const sections = await Promise.all(
            categories.map(async (cat) => ({
                category: cat,
                products: await Product.find({ category: { $regex: cat, $options: 'i' } }).limit(4)
            }))
        )
        res.render('home', { sections })
    } catch (error) {
        res.status(500).send(error.message)
    }
})