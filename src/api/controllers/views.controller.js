import { productManager, cartManager } from '../../dao/factory.js'
import { buildProductQuery } from '../../dao/helpers/productQuery.helper.js'

export const renderProducts = async (req, res) => {
    try {
        const { parsedLimit, parsedPage, filter, sortOption, query, sort } = buildProductQuery(req.query)

        const result = await productManager.getAll(filter, {
            limit: parsedLimit,
            page: parsedPage,
            sort: sortOption,
            lean: true
        })

        const baseUrl = '/products'
        const buildLink = (p) => `${baseUrl}?page=${p}&limit=${parsedLimit}${query ? `&query=${query}` : ''}${sort ? `&sort=${sort}` : ''}`

        res.render('products', {
            products:    result.docs,
            totalPages:  result.totalPages,
            page:        result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink:    result.hasPrevPage ? buildLink(result.prevPage) : null,
            nextLink:    result.hasNextPage ? buildLink(result.nextPage) : null,
            query:       query || '',
            sort:        sort || ''
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const renderProductDetail = async (req, res) => 
{
    try {
        const product = await productManager.getById(req.params.pid)

        if(!product) return res.status(404).render('404')

        res.render('product-detail', { product: product.toObject() })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const renderCart = async (req, res) => 
{
    try {
        const { cid }= req.params

        const cart = await cartManager.getById(cid)

        if(!cart) return res.status(404).render('404')

        const total = cart.products.reduce((acc, item) => {
            return acc + (item.product.price * item.quantity)
        }, 0)

        res.render('cart', {
            cart: cart.toObject(),
            total
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const renderHome = async (req, res) => {
    try {
        const result = await productManager.getAll({}, { limit: 4, page: 1, lean: true })

        res.render('home', { products: result.docs })
    } catch (error) {
        res.status(500).send(error.message)
    }
}