import fs from 'fs/promises'
import { randomUUID } from 'crypto'

const FILE_PATH = './src/dao/fs/data/carts.json'

export default class CartManagerFS
{
    async #readFile()
    {
        try {
            const data = await fs.readFile(FILE_PATH, 'utf-8')
            return JSON.parse(data)
        } catch {
            return[]
        }
    }

    async #writeFile(data)
    {
        await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2))
    }

    async getById(id)
    {
        const carts = await this.#readFile()
        return carts.find(c => c.id === id) || null
    }

    async create()
    {
        const carts = await this.#readFile()
        const newCart = { id: randomUUID(), products: [] }
        carts.push(newCart)
        await this.#writeFile(carts)
        return newCart
    }

    async addProduct(cart, pid)
    {
        const carts = await this.#readFile()
        const cartIndex = carts.findIndex(c => c.id === cart.id)

        const productIndex = carts[cartIndex].products.findIndex(
            item => item.product === pid
        )

        if(productIndex !== -1){
            carts[cartIndex].products[productIndex].quantity++
        } else {
            carts[cartIndex].products.push({ product: pid, quantity: 1 })
        }

        await this.#writeFile(carts)
        return carts[cartIndex]
    }

    async deleteProduct(cart, pid)
    {
        const carts = await this.#readFile()
        const cartIndex = carts.findIndex(c => c.id === cart.id)
        const productIndex = carts[cartIndex].products.findIndex(
            item => item.product === pid
        )
        if(productIndex === -1) return null
        carts[cartIndex].products.splice(productIndex, 1)
        await this.#writeFile(carts)
        return carts[cartIndex]
    }

    async updateCart(cart, products)
    {
        const carts = await this.#readFile()
        const cartIndex = carts.findIndex(c => c.id === cart.id)
        carts[cartIndex].products = products
        await this.#writeFile(carts)
        return carts[cartIndex]
    }

    async updateProductQuantity(cart, pid, quantity)
    {
        const carts = await this.#readFile()
        const cartIndex = carts.findIndex(c => c.id === cart.id)
        const productIndex = carts[cartIndex].products.findIndex(
            item => item.product === pid
        )
        if(productIndex === -1) return null
        carts[cartIndex].products[productIndex].quantity = quantity
        await this.#writeFile(carts)
        return carts[cartIndex]
    }

    async clearCart(cart)
    {
        const carts = await this.#readFile()
        const cartIndex = carts.findIndex(c => c.id === cart.id)
        carts[cartIndex].products = []
        await this.#writeFile(carts)
        return carts[cartIndex]
    }
}