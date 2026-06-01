import ProductManagerFS from './fs/ProductManagerFS.js'
import ProductManagerDB from './db/ProductManagerDB.js'
import CartManagerFS from './fs/CartManagerFS.js'
import CartManagerDB from './db/CartManagerDB.js'

const persistence = process.env.PERSISTENCE 

export const productManager = persistence === 'fs'
    ? new ProductManagerFS()
    : new ProductManagerDB()

export const cartManager = persistence === 'fs'
    ? new CartManagerFS()
    : new CartManagerDB()
