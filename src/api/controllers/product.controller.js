import Product from '../../models/product.model.js'

export const getProducts = async (req, res) => 
{
    try{
        const { limit } = req.query //capturamos el límite

        if(limit && (isNaN(parseInt(limit)) || limit <= 0)){
            return res.status(400).json({ status: 'error', message: 'El límite debe ser un número mayor a 0.' })
        }

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

export const createProducts = async (req, res) => 
{
    try{
        const product = req.body
        const newProduct = await Product.create(product)

        res.status(201).json({ status: 'success', payload: newProduct })
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message })
    }
}