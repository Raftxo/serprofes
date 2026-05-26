import { baseURL } from "./config.js";

/** callAPI: Nuestro cartero virtual (Cliente Genérico)
* @param {String} ruta - La ruta final ej. "post/1"
* @param {object} opciones - Configuración extra (POST, DELETE...)
*/

export async function callAPI(ruta,opciones={}){
    // 1. Construimos la URL completa (Base + Ruta)
    const urlCompleta = `${baseURL}${ruta}`;
    
    // 2. Iniciamos el bloque de seguridad (intenta hacer esto si fallas
    //    cae el CATCH)

    try{
        // 3. El 'await' pausa la ejecución hasta que el servidor conteste
        const respuesta = await fetch(urlCompleta,{
            headers: {"Content-Type": "application/json"},
            ...opciones // pegamos cualquier opción extra que nos pasen
        });
        // 4. Verificamos el estado (el servidor respondió,
        //    pero igual dijo "404 No encontrado")
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status} - ${respuesta.statusText}`);
        }
        // 5. Traducimos el paquete (JSON)
        const datos = await respuesta.json();
        return datos;

    }
    catch (error) {
        // 6. Si se cae el internet o la URL no existe, lo atrapamos aquí:
        console.error("Fallo crítico en el cartero: ",error);
        throw error; // Lanzamos el error para mostrarlo en la pantalla
    }


}