import Product from '../models/product.model.js'

export const validateProduct = async (req, res, next) => 
{
    const { pid } = req.params

    const product = await Product.findById(pid)
    if(!product){
        return res.status(404).json({ status: 'error', message: 'No existe un producto con ese ID.' })
    }
    
    req.product = product
    next()
}