export const buildProductQuery = (reqQuery) => 
{
    const { limit = 10, page = 1, query, sort } = reqQuery

    const parsedLimit = parseInt(limit)
    const parsedPage = parseInt(page)

    const filter = {}
    if(query){
        if(query === 'true' || query === 'false'){
            filter.status = query === 'true'
        } else {
            filter.category = { $regex: query, $options: 'i' }
        }
    }

    const sortOption = sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {}

    return { parsedLimit, parsedPage, filter, sortOption, query, sort, limit, page }
}