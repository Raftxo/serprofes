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
        // pintamos el objeto pantalla de forma bonita and beatiful
        // JSON.stringify(objeto,null,2) le da el formato de línea y espacios
        pantalla.textContent=JSON.stringify(post,null,2);
    }catch(error){
        pantalla.textContent="❌ no se encontró la publicación o hubo un error.";
    }
});