async function updateQuantity(cid, pid, currentQty, delta)
{
    const newQty = currentQty + delta 

    if(newQty <= 0){
        //Si baja de 1 pregunta si quiere eliminar
        if(confirm('Querés eliminar este producto del carrito?')){
            await removeProduct(cid, pid)
        }
        return
    }

    try {
        const response = await fetch(`/api/carts/${cid}/products/${pid}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity: newQty })
        })

        if(!response.ok) throw new Error('Error al actualizar cantidad.')

        document.getElementById(`qty-${pid}`).textContent = newQty

        const price = parseInt(document.getElementById(`subtotal-${pid}`).textContent.replace('$', '').replace('.', ''))
        location.reload()
    } catch (error) {
        alert('Error al actualizar la cantidad.')
    }
}

async function removeProduct(cid, pid)
{
    try {
        const response = await fetch(`/api/carts/${cid}/products/${pid}`, {
            method: 'DELETE'
        })
        if(!response.ok) throw new Error('Error al eliminar el producto.')

        document.getElementById(`cart-item-${pid}`).remove()

        location.reload()
    } catch (error) {
        alert('Error al eliminar el producto.')
    }
}