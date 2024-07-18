//Clase con los usuarios que se iran registrando. No seran admins por defectos, el unico admin por defecto es pepe

class Usuarios {
    constructor(usuario, email, pass, admin = false) {
        this.usuario = usuario,
            this.email = email,
            this.pass = pass,
            this.admin = admin
    }
}

//Buscando usuarios registrados
const usuariosRegistrados = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];

//La creacion de pepe
const adminPepe = usuariosRegistrados.find(usuario => usuario.usuario === 'pepe');

if (!adminPepe) {
    let adminDefecto = new Usuarios('pepe', 'pepe@hotmail.com', 'pepe', true);
    usuariosRegistrados.push(adminDefecto);
    localStorage.setItem('usuariosRegistrados', JSON.stringify(usuariosRegistrados));
}


usuariosRegistrados.forEach(element => { //<-esto solo es de test
    console.log(element);
});

//Nos llevara al login el boton cancelar
document.getElementById('cancelar').addEventListener('click', function () {
    window.location.href = 'login.html';
});

//Todo lo correspondiente al registro

registro = document.querySelector('#registro');

registro.addEventListener('click', () => {
    usuario_nuevo = document.querySelector('#user_register').value;

    email_nueva = document.querySelector('#email_register').value;

    pass_nueva = document.querySelector('#pass_register').value;

    const nuevoUsuario = new Usuarios(usuario_nuevo, email_nueva, pass_nueva);

    usuariosRegistrados.push(nuevoUsuario)

    localStorage.setItem('usuariosRegistrados', JSON.stringify(usuariosRegistrados));

    Swal.fire({
        position: "center",
        icon: "success",
        title: "Te registraste corrrectamente",
        showConfirmButton: false,
        timer: 1500
      });

setTimeout(() => {
    window.location.href = '../index.html';
}, 1500);
  

})




