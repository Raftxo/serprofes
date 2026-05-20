// =====================
// 1. BUSCADOR DINÁMICO
// =====================
const buscador = document.querySelector('#buscadorUsuarios');

buscador.addEventListener('input', () => {
    const terminoBusqueda = buscador.value.toLowerCase();

    const filas = document.querySelectorAll('#tablaUsuarios tbody tr');

    filas.forEach(fila => {
        const textFila = fila.textContent.toLowerCase();

        fila.style.display = textFila.includes(terminoBusqueda)
            ? ''
            : 'none';
    });
});


// =====================
// 2. ROLES ALEATORIOS SIN REPETIR
// =====================
let ultimoRol = null;

function obtenerRolRandom() {
    const roles = ["Usuario", "Admin", "Editor", "Developer"];
    let nuevoRol;

    do {
        nuevoRol = roles[Math.floor(Math.random() * roles.length)];
    } while (nuevoRol === ultimoRol);

    ultimoRol = nuevoRol;
    return nuevoRol;
}


// =====================
// 3. FORMULARIO (AÑADIR USUARIO)
// =====================
const form = document.querySelector('#suscripcionForm');
const inputNombre = document.querySelector('#nombreInput');
const cajaMensaje = document.querySelector('#mensajeExito');

form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nombre = inputNombre.value.trim();
    if (!nombre) return;

    const email = nombre.toLowerCase().replaceAll(" ", "") + "@agencia.com";
    const rol = obtenerRolRandom();

    const nuevaFila = document.createElement("tr");

    nuevaFila.innerHTML = `
        <td>${nombre}</td>
        <td>${email}</td>
        <td>${rol}</td>
    `;

    document.querySelector("#tablaUsuarios tbody").appendChild(nuevaFila);

    // actualizar gráfico
    actualizarGrafico();

    // mensaje
    cajaMensaje.textContent = `✔️ Usuario "${nombre}" añadido correctamente`;
    cajaMensaje.classList.remove("oculto");

    setTimeout(() => {
        cajaMensaje.classList.add("oculto");
    }, 2500);

    form.reset();
});


// =====================
// 4. GRÁFICO DE ROLES
// =====================
function actualizarGrafico() {
    const filas = document.querySelectorAll("#tablaUsuarios tbody tr");

    let conteo = {
        Usuario: 0,
        Admin: 0,
        Editor: 0,
        Developer: 0
    };

    filas.forEach(fila => {
        const rol = fila.children[2].textContent.trim();
        if (conteo[rol] !== undefined) {
            conteo[rol]++;
        }
    });

    // actualizar números
    document.getElementById("countUsuario").textContent = conteo.Usuario;
    document.getElementById("countAdmin").textContent = conteo.Admin;
    document.getElementById("countEditor").textContent = conteo.Editor;
    document.getElementById("countDeveloper").textContent = conteo.Developer;

    // calcular máximo
    const max = Math.max(...Object.values(conteo), 1);

    // actualizar barras
    document.getElementById("barraUsuario").style.height = (conteo.Usuario / max) * 100 + "px";
    document.getElementById("barraAdmin").style.height = (conteo.Admin / max) * 100 + "px";
    document.getElementById("barraEditor").style.height = (conteo.Editor / max) * 100 + "px";
    document.getElementById("barraDeveloper").style.height = (conteo.Developer / max) * 100 + "px";
}


// =====================
// 5. INICIALIZACIÓN
// =====================
actualizarGrafico();