import { callAPI } from "./api.js";

// Atrapamos los elementos de la interfaz
const pantalla = document.getElementById('pantallaResultados');
const btnBuscar = document.getElementById('btnBuscar');
const inputId = document.getElementById('inputId');
const btnError = document.getElementById('btnError');
const formCrear = document.getElementById('formCrear');

// get dinámico (Buscar Publicación)
btnBuscar.addEventListener('click',async ()=>{
    const id = inputId.value.trim();
    // seguridad: que no nos envíe campos vacíos
    if(id===""){
        pantalla.textContent="⚠️ Por favor, escribe un número válido de ID.";
        return;
    }
    pantalla.textContent="⌛️ viajando a internet ...";
    try{
        // llamamos a nuestro cartero con la ruta dinámica
        const post = await callAPI(`/posts/${id}`);
        // no usamos method:"GET" porque por defecto ya usa GET
        // pintamos el objeto pantalla de forma bonita and beatiful
        // JSON.stringify(objeto,null,2) le da el formato de línea y espacios
        pantalla.textContent=JSON.stringify(post,null,2);
    }catch(error){
        pantalla.textContent="❌ no se encontró la publicación o hubo un error ❌";
    }
});

// botón Forzar Error rompiendo la ruta
btnError.addEventListener('click',async ()=>{
    pantalla.textContent = "⌛️ Forzando un accidente... ";

    try{
        // enviamos al cartero a una ruta que no existe
        const data = await callAPI("/ruta-inventada-que-no-existe");
        pantalla.textContent = JSON.stringify(data,null,2);
    }catch (error){
        // como la ruta da error 404, el código viene aquí y no se rompe
        pantalla.textContent=`🛡️ El escudo Try/Catch funcionó\n   Detalle del error: ${error.message}`;
    }
});

// el reto: crear publicación (POST)
const inputTitulo = document.getElementById('inputTitulo');
const inputCuerpo = document.getElementById('inputCuerpo');

formCrear.addEventListener('submit', async (e) => {
    e.preventDefault(); // 🚫 evita recargar

    const titulo = inputTitulo.value.trim();
    const cuerpo = inputCuerpo.value.trim();

    if (titulo === "" || cuerpo === "") {
        pantalla.textContent = "⚠️ Todos los campos son obligatorios";
        return;
    }

    pantalla.textContent = "⌛️ Enviando publicación...";

    try {
        const nuevaPublicacion = await callAPI("/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: titulo,
                body: cuerpo,
                userId: 1
            })
        });

        pantalla.textContent =
            "✅ Publicación creada:\n" +
            JSON.stringify(nuevaPublicacion, null, 2);

        formCrear.reset(); // limpia el formulario

    } catch (error) {
        pantalla.textContent =
            "❌ Error al crear la publicación: " + error.message;
    }
});