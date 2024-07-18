// Verificar sesión al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    verificarSesion();
});

// Función para realizar el login
function login(user, pass) {
    const usuariosRegistrados = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];
    const usuarioEncontrado = usuariosRegistrados.find(usuario => usuario.usuario === user && usuario.pass === pass);

    if (usuarioEncontrado) {
        // Marcar la sesión como activa y almacenar el usuario activo
        localStorage.setItem('sesionActiva', JSON.stringify(true));
        localStorage.setItem('usuarioActivo', JSON.stringify(usuarioEncontrado)); // Almacenar el usuario activo
        
        // Mostrar el panel administrativo si el usuario es admin
        if (usuarioEncontrado.admin) {
            document.querySelector('#panelButton').style.display = 'block';
        }

        return true;
    } else {
        return false;
    }
}

// Función para verificar y mostrar el panel administrativo al cargar la página
function verificarSesion() {
    const sesionActiva = JSON.parse(localStorage.getItem('sesionActiva')) || false;
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));

    if (sesionActiva && usuarioActivo && usuarioActivo.admin) {
        console.log('Usuario admin encontrado');
        document.querySelector('#panelButton').style.display = 'block';
        document.querySelector('#logoutButton').style.display = 'block';
        document.querySelector('#loginButton').style.display = 'none';
    } 
    else if(sesionActiva && usuarioActivo){
        document.querySelector('#panelButton').style.display = 'none';
        document.querySelector('#logoutButton').style.display = 'block';
        document.querySelector('#loginButton').style.display = 'none';
    }
    
    else {
        console.log('Usuario no admin o no hay sesión activa');
        document.querySelector('#panelButton').style.display = 'none';
        document.querySelector('#logoutButton').style.display = 'none';
        document.querySelector('#loginButton').style.display = 'block'; 
    }
}


document.getElementById('logoutButton').addEventListener('click', function (event) {
    event.preventDefault();

    console.log('Click en logout'); // Añadir un mensaje de consola para verificar que se ejecuta

    // Cerrar sesión y eliminar usuario activo
    localStorage.removeItem('sesionActiva');
    localStorage.removeItem('usuarioActivo');
    document.querySelector('#panelButton').style.display = 'none';
    document.querySelector('#logoutButton').style.display = 'none';
    document.querySelector('#loginButton').style.display = 'block'; // Mostrar el botón de login

    // Redirigir a la página de inicio
    if (window.location.href.includes('index.html')) {
        window.location.href = '#';
    } else {
        window.location.href = '../index.html'; 
    }
});

// Evento al hacer click en el botón de iniciar sesión
document.getElementById('iniciar').addEventListener('click', function (event) {
    event.preventDefault();

    let username = document.getElementById('user').value;
    let password = document.getElementById('pass').value;

    if (login(username, password)) {

        Swal.fire({
            position: "center",
            icon: "success",
            title: "sesión iniciada con éxito",
            showConfirmButton: false,
            timer: 1500
          });

        
  
        if (window.location.href.includes('login.html')) {
            setTimeout(() => {
                window.location.href = 'tienda.html'; 
            }, 2*1000);
            // Redirigir a la página de la tienda después del login
        }
    } else {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Usuario o contraseña inorretos",
          });
    }
});
