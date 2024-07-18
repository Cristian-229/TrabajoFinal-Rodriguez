document.addEventListener('DOMContentLoaded', function () {
    cargarProductosConfirmados();
});

// Función para cargar productos confirmados en la página
function cargarProductosConfirmados() {
    const productosContainer = document.getElementById('pedidoResumen');
    const totalGeneralElement = document.getElementById('totalGeneral');
    let totalGuardado = parseInt(localStorage.getItem('total')) || 0;
    const productosConfirmados = JSON.parse(localStorage.getItem('productosConfirmados')) || [];
    let totalGeneral = 0;

    productosContainer.innerHTML = '';

    productosConfirmados.forEach(producto => {
        let totalProducto = producto.precio * producto.unidades;
        totalGeneral += totalProducto;

        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.precio} USD</td>
            <td>${producto.unidades}</td>
            <td>${totalProducto} USD</td>
        `;
        productosContainer.appendChild(row);
        
    });

    if (totalGeneral === 0 && totalGuardado > 0) {
        totalGeneral = totalGuardado;
    }

    totalGeneralElement.innerText = `${totalGeneral} USD`;

    if (totalGeneral !== totalGuardado) {
        localStorage.setItem('total', totalGeneral);
    }
}

// Función para actualizar el stock en localStorage
function actualizarStock(nombreProducto, unidades) {
    let productos = JSON.parse(localStorage.getItem('productos')) || [];

    productos.forEach(producto => {
        if (producto.nombre === nombreProducto) {
            producto.stock -= unidades;
        }
    });

    localStorage.setItem('productos', JSON.stringify(productos));
}

document.getElementById('modificarPedido').addEventListener('click', function () {
    window.location.href = 'tienda.html';
});

document.getElementById('enviarPedido').addEventListener('click', function () {
    Swal.fire({
        title: "¿Seguro desea confirmar su pedido?",
        text: "Una vez enviado no puede hacer modificaciones",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Enviar"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Pedido enviado con éxito",
                text: "¡Gracias por su compra!",
                icon: "success",
                showConfirmButton: false,
                timer: 2000,
            });
            const productosConfirmados = JSON.parse(localStorage.getItem('productosConfirmados')) || [];
            productosConfirmados.forEach(producto => {
                actualizarStock(producto.nombre, producto.unidades);
            })

            localStorage.removeItem('productosConfirmados');
            localStorage.removeItem('cantidades');
            localStorage.removeItem('total');

            setTimeout(() => {
                window.location.href = '../index.html';
            }, 2000);
        }
    });
});
