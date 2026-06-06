import { parse } from 'dotenv'
import Product from '../../models/product.model.js'
import { productManager } from '../../dao/factory.js'
import { buildProductQuery } from '../../dao/helpers/productQuery.helper.js'
import { io } from '../../app.js'

export const getProducts = async (req, res) => 
{
    try{
        const { parsedLimit, parsedPage, filter, sortOption, query, sort } = buildProductQuery(req.query)
        
        if(isNaN(parsedLimit) || parsedLimit <= 0){
            return res.status(400).json({ status: 'error', message: 'limit debe ser un número mayor a 0.' })
        }
        if(isNaN(parsedPage) || parsedPage <= 0){
            return res.status(400).json({ status: 'error', message: 'page debe ser un número mayor a 0.' })
        }

        //Paginación
        const result = await productManager.getAll(filter, {
            limit: parsedLimit,
            page: parsedPage,
            sort: sortOption
        })

        //Links de prev y next
        const baseUrl = '/api/products'
        const buildLink = (p) => `${baseUrl}?page=${p}&limit=${parsedLimit}${query ? `&query=${query}` : ''}${sort ? `&sort=${sort}` : ''}`
        
        res.json({ 
            status: 'success',
            payload: result.docs,
            totalPages: result.totalPages,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            prevLink: result.hasPrevPage ? buildLink(result.prevPage) : null,
            nextLink: result.hasNextPage ? buildLink(result.nextPage) : null 
        })
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message })
    }
}

export const createProduct = async (req, res) => 
{
    try{
        const product = req.body
        const newProduct = await productManager.create(product)
        io.emit('productUpdated')
        res.status(201).json({ status: 'success', payload: newProduct })
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message })
    }
}

export const getProductById = async (req, res) => 
{
    try{
        const { id } = req.params

        const product = await productManager.getById(id)

        if(!product){
            return res.status(400).json({ status: 'error', message: 'No existe un producto con ese ID.' })
        }

        res.status(200).json({ status: 'success', payload: product })
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message })
    }
}

export const updateProduct = async (req, res) => 
{
    try{
        const { id } = req.params
        delete req.body._id

        const updatedProduct = await productManager.update(id, req.body)

        if(!updatedProduct){
            return res.status(404).json({ status: 'error', message: 'No existe un producto con ese ID.' })
        } 

        io.emit('productUpdated')
        res.status(200).json({ status: 'success', payload: updatedProduct })
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message })
    }
}

export const deleteProduct = async (req, res) => 
{
    try{
        const { id } = req.params 
        const deletedProduct = await productManager.delete(id)

        if(!deletedProduct){
            return res.status(404).json({ status: 'error', message: 'No existe un producto con ese ID.' })
        }

        io.emit('productUpdated')
        res.status(200).json({ status: 'success', message: `Producto "${deletedProduct.title}" eliminado correctamente.` })
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message })
    }
}