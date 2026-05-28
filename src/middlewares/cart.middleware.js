import Cart from '../models/cart.model'

export const validateCart = async (req, res, next) =>
{
    const { cid } = req.params

    const cart = await Cart.findById(cid)
    if(!cart){
        return res.status(404).json({ status: 'error', message: 'No existe un carrito con ese ID.' })
    }

    req.cart = cart
    next()
}