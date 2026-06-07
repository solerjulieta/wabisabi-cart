const btn = document.getElementById('add-to-cart')
const message = document.getElementById('cart-message')
const pid = btn.dataset.pid 

async function getOrCreateCart()
{
    let cartId = localStorage.getItem('cartId')

    if(!cartId){
        const response = await fetch('/api/carts', { method: 'POST' })
        const data = await response.json()
        cartId = data.payload._id
        localStorage.setItem('cartId', cartId)
    }

    return cartId
}

btn.addEventListener('click', async () => {
    try {
        btn.disabled = true
        btn.textContent = 'agregando...'

        const cartId = await getOrCreateCart()

        const response = await fetch(`/api/carts/${cartId}/products/${pid}`, {
            method: 'POST'
        })

        if(!response.ok) throw new Error('Error al agregar al carrito.')

        // Feedback visual — éxito
        btn.textContent = '✓ agregado'
        btn.classList.add('bg-[#1E1C1A]', 'text-[#F5F2ED]')

        message.textContent = `Producto agregado — `
        message.innerHTML += `<a href="/carts/${cartId}" class="underline hover:text-[#1E1C1A] transition-colors">ver carrito</a>`
        message.classList.remove('hidden')

        // Vuelve al estado original después de 3 segundos
        setTimeout(() => {
            btn.disabled = false
            btn.textContent = 'agregar al carrito'
            btn.classList.remove('bg-[#1E1C1A]', 'text-[#F5F2ED]')
        }, 3000)
    } catch (error) {
        btn.disabled = false
        btn.textContent = 'agregar al carrito'
        message.textContent = 'Error al agregar el producto'
        message.classList.remove('hidden')
        message.classList.add('text-[#B85C38]')
    }
})