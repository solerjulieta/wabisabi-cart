import Cart from '../../models/cart.model.js'

export const createCart = async (req, res) => 
{
    try {
        const newCart = await Cart.create({ products: [] })

        res.status(201).json({ status: 'success', payload: newCart })
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message })
    }
}

export const getCartById = async (req, res) => 
{
    try {
        const { id } = req.params

        const cart = await Cart.findById(id).populate('products.product')

        if(!cart){
            return res.status(404).json({ status: 'error', message: 'No existe un carrito con ese ID.' })
        }

        res.status(200).json({ status: 'success', payload: cart })
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message })
    }
}