import Product from '../../models/product.model.js'

export const getProducts = async (req, res) => {
    try{
        const { limit } = req.query //capturamos el límite

        const query = Product.find()

        if(limit){
            query.limit(parseInt(limit))
        }

        const products = await query
        
        res.json({ status: 'success', payload: products })
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message })
    }
}