import ProductManagerFS from './fs/ProductManagerFS'
import ProductManagerDB from './db/ProductManagerDB'

const persistence = process.env.PERSISTENCE 

export const productManager = persistence === 'fs'
    ? new ProductManagerFS()
    : new ProductManagerDB()

