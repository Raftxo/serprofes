// 1. formulario sin recarga

const form = document.querySelector('#suscripcionForm');
const inputNombre = document.querySelector('#nombreInput');
const cajaMensaje = document.querySelector('#mensajeExito');

// escuchamos el evento 'submit' (cuando se envíe el formulario)
form.addEventListener('submit',(evento)=>{
    // - la línea mágica que evita que la página se recargue
    evento.preventDefault();
    // - capturamos lo que el usuario escribió con .trim que quita el espacio
    const textoEscrito = inputNombre.value.trim();
    // - mostramos el mensaje de éxito
    cajaMensaje.textContent = `✔️ Usuario "${textoEscrito}" registrado correctamente en la base de datos.`;
    cajaMensaje.classList.remove('oculto');
});
