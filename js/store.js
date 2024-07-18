document.addEventListener('DOMContentLoaded', function () {
    // Confirmación de compra
    document.querySelector('.productos__confirmacion button:last-child').addEventListener('click', function () {
        let productosConfirmados = JSON.parse(localStorage.getItem('productosConfirmados')) || [];
        let productos = document.querySelectorAll('.productos__listado');

        productos.forEach(productoElement => {
            let nombre = productoElement.querySelector('.producto__descripcion p').textContent;
            let precioTexto = productoElement.querySelector('.producto__precio p').innerText;
            let precio = parseFloat(precioTexto);
            let unidades = parseInt(productoElement.querySelector('.producto__cantidad .unidades').innerText, 10);

            // Encontrar el producto existente
            let productoExistente = productosConfirmados.find(prod => prod.nombre === nombre);

            if (unidades > 0) {
                if (productoExistente) {
                    // Actualizar el producto existente
                    productoExistente.unidades = unidades;
                } else {
                    // Agregar un nuevo producto
                    productosConfirmados.push({
                        nombre,
                        precio,
                        unidades
                    });
                }
            } else {
                // Si la cantidad es 0, eliminar el producto de la lista confirmada
                productosConfirmados = productosConfirmados.filter(prod => prod.nombre !== nombre);
            }
        });

        localStorage.setItem('productosConfirmados', JSON.stringify(productosConfirmados));
        window.location.href = 'pedidofinal.html';
    });

    // Cancelar la compra
    document.querySelector('.productos__botonesConfirmacion').addEventListener('click', function () {
        localStorage.removeItem('cantidades');
        localStorage.removeItem('total');
        window.location.href = '../index.html';
    });
});
