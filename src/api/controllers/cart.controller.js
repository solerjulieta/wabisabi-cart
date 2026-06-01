import { cartManager } from '../../dao/factory.js'

export const createCart = async (req, res) => 
{
    try {
        const newCart = await cartManager.create()

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

        const updatedCart = await cartManager.addProduct(cart, pid)
        res.status(200).json({ status: 'success', payload: updatedCart })
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message })
    }
}

export const deleteProduct = async (req, res) => 
{
    try {
        const { pid } = req.params
        const cart = req.cart

        const updatedCart = await cartManager.deleteProduct(cart, pid)

        if(!updatedCart){
            return res.status(404).json({ status: 'error', message: 'El producto no está en el carrito.' })
        }
        res.status(200).json({ status: 'success', payload: updatedCart })
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message })
    }
}

export const updateCart = async (req, res) => 
{
    try {
        const cart = req.cart
        const { products } = req.body

        if(!products || !Array.isArray(products)){
            return res.status(400).json({ status: 'error', message: 'Debe enviar un array de productos.' })
        }

        const updatedCart = await cartManager.updateCart(cart, products)
        res.status(200).json({ status: 'success', payload: updatedCart })
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message })
    }
}

export const updateProductQuantity = async (req, res) => 
{
    try {
        const { pid } = req.params
        const { quantity } = req.body
        const cart = req.cart

        if(!quantity || isNaN(quantity) || quantity <= 0){
            return res.status(400).json({ status: 'error', message: 'La cantidad debe ser un número mayor a 0.' })
        }

        const updatedCart = await cartManager.updateProductQuantity(cart, pid, quantity)

        if(!updatedCart){
            return res.status(404).json({ status: 'error', message: 'El producto no está en el carrito.' })
        }

        res.status(200).json({ status: 'success', payload: updatedCart })
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message })
    }
}

export const clearCart = async (req, res) => 
{
    try {
        const cart = req.cart
        const updatedCart = await cartManager.clearCart(cart)
        res.status(200).json({ status: 'success', message: 'Carrito vaciado correctamente.' })
    } catch (error) {
        res.status(500).json({ status: 'success', message: error.message })
    }
}