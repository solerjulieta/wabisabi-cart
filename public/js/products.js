const socket = io()

socket.on('productUpdated', () => {
    fetchProducts()
})

async function fetchProducts()
{
    //Mantiende los filtros y paginación actuales de la URL
    const params = new URLSearchParams(window.location.search)

    const response = await fetch(`/api/products?${params.toString()}`)
    const data = await response.json()

    renderProducts(data.payload)
    renderPagination(data)
}

function renderProducts(products){
    const grid = document.getElementById('products-grid')

    if(products.length === 0){
        grid.innerHTML = '<p class="text-gray-500 col-span-3 text-center py-8">No hay productos disponibles.</p>'
        return
    }

    grid.innerHTML = products.map(product => `
        <div class="group rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
            ${product.thumbnails?.length
                ? `<img src="${product.thumbnails[0]}" alt="${product.title}" class="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300">`
                : `<div class="w-full aspect-square bg-gray-100 flex items-center justify-center text-gray-400 text-sm">Sin imagen</div>`
            }
            <div class="p-4">
                <p class="text-xs text-gray-400 uppercase tracking-wider mb-1">${product.category}</p>
                <h3 class="font-medium text-gray-800 mb-2">${product.title}</h3>
                <p class="font-semibold text-gray-900 mb-3">$${product.price}</p>
                <a href="/products/${product._id}"
                class="block text-center text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors">
                Ver detalle
                </a>
            </div>
        </div>
    `).join('')
}