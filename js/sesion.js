//Vamos a verificar si hay una sesion activa, y si es asi en seleccionar tienda nos lleva a tienda, sino a login

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('tiendaLink').addEventListener('click', function (event) {
        event.preventDefault();

        // Verificar si hay sesión activa
        const sesionActiva = JSON.parse(localStorage.getItem('sesionActiva'));

        const pathname = window.location.pathname;

        if (sesionActiva) {
            if (!pathname.includes('pages/tienda.html') && pathname.includes('index.html')) {
                window.location.href = 'pages/tienda.html';
            }
            else {
                window.location.href = 'tienda.html'
            }

        } else {
            if (!pathname.includes('pages/login.html') && pathname.includes('index.html')) {
                window.location.href = 'pages/login.html';
            }
            else {
                window.location.href = 'login.html';
            }
        }
    });
});