
const contenedorUsuarios = document.querySelector('#usuarios');
const contenedorAdmins = document.querySelector('#admins');

//Busqueda de usuarios registrados
const usuariosRegistrados = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];



function renderUsuarios() {
    contenedorUsuarios.innerHTML = '';
    contenedorAdmins.innerHTML = '';

    usuariosRegistrados.forEach((element, index) => {
        const usuarioDiv = document.createElement('div');
        usuarioDiv.className = 'elementosUsuarios';
        usuarioDiv.textContent = `${element.usuario} (${element.email})`;
        usuarioDiv.dataset.index = index;

        if (!element.admin) {
            usuarioDiv.addEventListener('click', () => cambiarEstadoAdmin(index));
            contenedorUsuarios.appendChild(usuarioDiv);
        } else {
            usuarioDiv.addEventListener('click', () => cambiarEstadoAdmin(index));
            contenedorAdmins.appendChild(usuarioDiv);
        }
    });
}


function cambiarEstadoAdmin(index) {
    usuariosRegistrados[index].admin = !usuariosRegistrados[index].admin;
    localStorage.setItem('usuariosRegistrados', JSON.stringify(usuariosRegistrados));
    renderUsuarios();
}

// Renderizar los usuarios inicialmente
renderUsuarios();

// Función para actualizar el stock del producto seleccionado
function actualizarStockProducto(productos) {
    const menu = document.querySelector('#menuDespegableId');
    const selectedProducto = menu.value;
    const nuevoStock = document.querySelector('#stockInput').value;

    if (nuevoStock !== '' && !isNaN(nuevoStock)) {
        const producto = productos.find(producto => producto.nombre.toLowerCase() === selectedProducto);
        if (producto) {
            producto.stock = parseInt(nuevoStock);
            // Guardar los productos actualizados en localStorage
            localStorage.setItem('productos', JSON.stringify(productos));
            const stockElement = document.querySelector(`#stock__${selectedProducto}`);
            if (stockElement) {
                stockElement.textContent = nuevoStock;
            }
        }
    }
    
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Stock Actualizado",
        showConfirmButton: false,
        timer: 1500
      });

}

// Event listener para cargar elementos y manejar el botón de actualizar
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('#menuDespegableId')) {
        llenarMenuDesplegable(productosActuales);
        document.getElementById('updateStockButton').addEventListener('click', () => {
            actualizarStockProducto(productosActuales);
        });
    }

    if (document.querySelector('.productos')) {
        crearProductoElementos(productosActuales);
    }
});

function llenarMenuDesplegable(productos) {
    const menu = document.querySelector('#menuDespegableId');
    productos.forEach(producto => {
        const option = document.createElement('option');
        option.value = producto.nombre.toLowerCase();
        option.textContent = producto.nombre;
        menu.appendChild(option);
    });
}