import fs from 'fs/promises'
import { randomUUID } from 'crypto'

export default class ProductManagerFS {
    constructor(){
        this.path = './src/dao/fs/data/products.json'
    }

    async #readFile() 
    {
        try {
            const data = await fs.readFile(this.path, 'utf-8')
            return JSON.parse(data)
        } catch (error) {
            return []
        }
    }

    async #writeFile(data)
    {
        await fs.writeFile(this.path, JSON.stringify(data, null, 2))
    }

    async getAll()
    {
        return await this.#readFile()
    }

    async create(product)
    {
        const products = await this.#readFile()
        const newProduct = { id: randomUUID(), ...product }
        products.push(newProduct)
        await this.#writeFile(products)
        return newProduct
    }

    async update(id, data)
    {
        const products = await this.#readFile()
        const index = products.findIndex(p => p.id === id)
        if (index === -1) return null
        products[index] = { ...products[index], ...data, id }
        await this.#writeFile(products)
        return products[index]
    }

    async delete(id)
    {
        const products = await this.#readFile()
        const index = products.findIndex(p => p.id === id)
        if (index === -1) return null 
        const deleted = products.splice(index, 1)[0]
        await this.#writeFile(products)
        return deleted
    }
}