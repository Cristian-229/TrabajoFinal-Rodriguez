//Adopcion en la pagina nosotros con la api y libreria sweetalert

const container = document.getElementById('card-container');

fetch('https://dog.ceo/api/breeds/image/random/1')
  .then(response => response.json())
  .then(datos => {
    const imagenes = datos.message;
    console.log(datos);


    imagenes.forEach(imagen => {

      const plantilla = document.querySelector('template').content.cloneNode(true);


      plantilla.querySelector('img').src = imagen;


      container.appendChild(plantilla);
    });

    document.querySelector('#enlaceDog').addEventListener('click', async function () {
      const { value: email } = await Swal.fire({
        title: "Por favor, dejanos tu correo",
        input: "email",
        inputLabel: "¡Nos estaremos contactando pronto con vos!",
        inputPlaceholder: "Ingresa tu correo"
      });
      if (email) {
        Swal.fire({
          title: "Solicitud enviada con exito",
          showConfirmButton: false,
          text: "Lo contactaremos pronto",
          icon: "success",
          timer: 2000
        }

        );
      }
    })
  })
  .catch(error => console.log(error));



