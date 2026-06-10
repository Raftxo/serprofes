// =====================
// 1. FORMULARIO (AÑADIR LLEGADA)
// =====================
const form = document.querySelector('#suscripcionForm');
const inputNombre = document.querySelector('#nombreInput');
const inputProfesion = document.querySelector('#profesionInput');
const listaLlegadas = document.querySelector('#listaLlegadas');
const contadorAsistentes = document.querySelector('#contadorAsistentes');
const cajaMensaje = document.querySelector('#mensajeExito');

form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nombre = inputNombre.value.trim();
    const profesion = inputProfesion.value.trim();

    if (!nombre || !profesion) return;

    // Crear nuevo elemento li
    const nuevoElemento = document.createElement('li');
    nuevoElemento.innerHTML = `<strong>${nombre}</strong> - <em>${profesion}</em>`;

    // Añadir a la lista
    listaLlegadas.appendChild(nuevoElemento);

    // Actualizar contador
    const total = listaLlegadas.children.length;
    contadorAsistentes.textContent = total;

    // Mensaje de éxito
    cajaMensaje.textContent = `✔️ Entrada registrada: "${nombre}"`;
    cajaMensaje.classList.remove("oculto");

    setTimeout(() => {
        cajaMensaje.classList.add("oculto");
    }, 2500);

    // Limpiar formulario
    form.reset();
});
