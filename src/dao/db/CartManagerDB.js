import Cart from '../../models/cart.model.js'

export default class CartManagerDB 
{
    async getById(id)
    {
        return await Cart.findById(id).populate('products.product')
    }

    async create()
    {
        return await Cart.create({ products: [] })
    }

    async addProduct(cart, pid)
    {
        const productIndex = cart.products.findIndex(
            item => item.product.toString() === pid
        )

        if(productIndex !== -1){
            cart.products[productIndex].quantity++
        } else {
            cart.products.push({ product: pid, quantity: 1 })
        }

        return await cart.save()
    }

    async deleteProduct(cart, pid)
    {
        const productIndex = cart.products.findIndex(
            item => item.product.toString() === pid 
        )
        if(productIndex === -1) return null
        cart.products.splice(productIndex, 1)
        return await cart.save()
    }

    async updateProductQuantity(cart, pid, quantity)
    {
        const productIndex = cart.products.findIndex(
            item => item.product.toString() === pid
        )
        if(productIndex === -1) return null
        cart.products[productIndex].quantity = quantity
        return await cart.save()
    }

    async clearCart(cart)
    {
        cart.products = []
        return await cart.save()
    }
}