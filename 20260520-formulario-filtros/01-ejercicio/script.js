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

// 2. buscador en tabla en tiempo real
const buscador = document.querySelector('#buscadorUsuarios');
// - seleccionamos todas las filas que están dentro del cuerpo de la tabla (tbody)
const filas = document.querySelectorAll('#tablaUsuarios tbody tr');
// - el evento 'input' se dispara cada vez que el usuario pulsa una tecla
buscador.addEventListener('input',()=>{
    // - convertimos lo que escribe el usuario a minúsculas para evitar confusiones con mayúsculas
    const terminoBusqueda = buscador.value.toLowerCase();
    // - usamos el bucle forEach para revisar fila a fila
    filas.forEach(fila=>{
        // obtenemos todo el texto de esa fila en minúsculas
        const textFila = fila.textContent.toLowerCase();
        // 3. condicional: ¿el texto de la fila incluye lo que buscamos?
        if(textFila.includes(terminoBusqueda)){
            fila.style.display = '';
        }else{
            // si no lo incluye lo ocultamos con display:none
            fila.style.display = 'none';
        }
    });
});
