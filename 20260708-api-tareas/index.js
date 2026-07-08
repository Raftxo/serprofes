// primer servidor web con express
// 1. Importamos la librería Express.
//    Express nos permite crear servidores web de forma sencilla
const express = require("express");
// 2. Creamos una aplicación con Express.
//    La variable "app" será nuestro servidor
const app = express();
// 3. Definimos el puerto donde escuchará el servidor
//    En este caso utilizaremos el puerto 3000
const PORT = 3000;



// 4. Iniciamos el servidor
//    listen() hace que el servidor quede esperando peticiones
//    de los clientes (por ejemplo, desde un navegador)
app.listen(PORT, ()=>{
    // 5. Cuando el servidor se inicia correctamente,
    //    mostramos un mensaje en la consola.
    console.log(`🏃‍♀️ Servidor ejecutándose en http://localhost:${PORT}`);
});