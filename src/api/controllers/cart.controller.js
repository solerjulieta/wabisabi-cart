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

export const addProduct = async (req, res) => 
{
    try {
        const { pid } = req.params
        const cart = req.cart

        //Coroboro si el producto ya está en el carrito
        const productIndex = cart.products.findIndex(
            (item) => item.product.toString() === pid
        )

        if(productIndex !== -1){
            //Si existe, incrementamos la cantidad
            cart.products[productIndex].quantity++
        } else {
            //Si no existe, lo agregamos
            cart.products.push({ product: pid, quantity: 1 })
        }

        await cart.save()

        res.status(200).json({ status: 'success', payload: cart })

    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message })
    }
}

export const deleteProduct = async (req, res) => 
{
    try {
        const { pid } = req.params
        const cart = req.cart

        const productIndex = cart.products.findIndex(
            (item) => item.product.toString() === pid
        )

        if(productIndex !== -1){
            return res.status(404).json({ status: 'error', message: 'El producto no está en el carrito.' })
        }

        cart.products.splice(productIndex, 1)
        await cart.save()

        res.status(200).json({ status: 'success', payload: cart })
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message })
    }
}