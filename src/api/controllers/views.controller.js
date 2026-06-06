import { productManager } from '../../dao/factory.js'
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
        const buildLink = (p) => `${baseUrl}?page=${p}&limit=${limit}${query ? `&query=${query}` : ''}${sort ? `&sort=${sort}` : ''}`

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