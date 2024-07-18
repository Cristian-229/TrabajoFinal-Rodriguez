class Producto {
            constructor(nombre, precio, stock, img) {
                this.nombre = nombre;
                this.precio = precio;
                this.stock = stock;
                this.img = img;
            }
        }

        const productosIniciales = [
            new Producto('Bujia', 45, 30, '../assets/img/bujia.png'),
            new Producto('Cilindro', 40, 20, '../assets/img/cilindro.png'),
            new Producto('Piston', 35, 20, '../assets/img/piston.png')
        ];

        
        function cargarProductos() {
            const productosGuardados = localStorage.getItem('productos');
            if (productosGuardados) {
                return JSON.parse(productosGuardados).map(prod => new Producto(prod.nombre, prod.precio, prod.stock, prod.img));
            } else {
                localStorage.setItem('productos', JSON.stringify(productosIniciales));
                return productosIniciales;
            }
        }

        const productosActuales = cargarProductos();

        function crearProductoElementos(productos) {
            const template = document.getElementById('producto-template');
            const productosContainer = document.querySelector('.productos');

            let cantidades = JSON.parse(localStorage.getItem('cantidades')) || {};

            productos.forEach(producto => {
                const clone = document.importNode(template.content, true);

                clone.querySelector('.producto__item').src = producto.img;
                clone.querySelector('.descripcion').textContent = producto.nombre;
                clone.querySelector('.precio').textContent = producto.precio;
                clone.querySelector('.stock').textContent = producto.stock;
                clone.querySelector('.unidades').textContent = cantidades[producto.nombre] || '0';

                const botonSacar = clone.querySelector('.producto__boton:first-of-type');
                botonSacar.addEventListener('click', () => {
                    actualizarCantidad(producto.nombre, -1);
                });

                const botonAgregar = clone.querySelector('.producto__boton:last-of-type');
                botonAgregar.addEventListener('click', () => {
                    let unidadesElemento = botonAgregar.parentElement.querySelector('.unidades');
                    let unidades = parseInt(unidadesElemento.textContent, 10);
                    let stock = producto.stock;

                    if (unidades < stock) {
                        actualizarCantidad(producto.nombre, 1);
                    } else {
                        Toastify({
                            text: "Stock máximo alcanzado",
                            duration: 3000,
                            style: {
                                background: "linear-gradient(to right, #ff7e5f, #feb47b)",
                                color: "white",
                                fontSize: "14px",
                                padding: "15px",
                                width: "190px",
                                height: "60px"
                            }
                        }).showToast();
                    }
                });

                productosContainer.appendChild(clone);
            });

            actualizarTotal();
        }

        function actualizarTotal() {
            let cantidades = JSON.parse(localStorage.getItem('cantidades')) || {};
            let total = productosActuales.reduce((acc, producto) => acc + (producto.precio * (cantidades[producto.nombre] || 0)), 0);
            $('#total').text(total);
            localStorage.setItem('total', total);
        }

        function actualizarCantidad(nombre, cantidad) {
            let cantidades = JSON.parse(localStorage.getItem('cantidades')) || {};
            cantidades[nombre] = (cantidades[nombre] || 0) + cantidad;
            if (cantidades[nombre] < 0) cantidades[nombre] = 0;
            localStorage.setItem('cantidades', JSON.stringify(cantidades));

            $(`.descripcion:contains(${nombre})`).closest('.productos__listado').find('.unidades').text(cantidades[nombre]);

            actualizarTotal();

            // Actualiza los productos en el localStorage
            localStorage.setItem('productos', JSON.stringify(productosActuales));
        }

        function ordenarProductos(campo, orden) {
            productosActuales.sort((a, b) => {
                if (orden === 'asc') {
                    return a[campo] > b[campo] ? 1 : -1;
                } else {
                    return a[campo] < b[campo] ? 1 : -1;
                }
            });
            $('.productos__listado').remove();
            crearProductoElementos(productosActuales);
        }

        $(document).ready(function() {
            if ($('.productos').length) {
                crearProductoElementos(productosActuales);
            }

            $('#asc-producto').click(function() {
                ordenarProductos('nombre', 'asc');
            });

            $('#desc-prod').click(function() {
                ordenarProductos('nombre', 'desc');
            });

            $('#asc-precio').click(function() {
                ordenarProductos('precio', 'asc');
            });

            $('#desc-precio').click(function() {
                ordenarProductos('precio', 'desc');
            });

            $('#asc-stock').click(function() {
                ordenarProductos('stock', 'asc');
            });

            $('#desc-stock').click(function() {
                ordenarProductos('stock', 'desc');
            });

            $('#busqueda').on('input', function() {
                const searchValue = $(this).val().toLowerCase();
                $('.productos__listado').each(function() {
                    const productName = $(this).find('.descripcion').text().toLowerCase();
                    if (productName.includes(searchValue)) {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                });
            });
        });