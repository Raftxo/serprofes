// Mostramos información del sistema
// console.log("Sistema operativo: " + process.platform);
// console.log("Versión de Node.js: " + process.version);

// Importamos express
const express = require("express");
// Creamos una app de express
const app = express();
// Cuando alguien visite, ejecuta la siguiente función de la ruta principal
// Creamos una ruta principal
app.get("/", (req, res) => {
  res.send("¡Servidor funcionando!");
});

// Creamos otra ruta
app.get("/saludo", (req, res) => {
  res.send("¡Hola!");
});

// Arrancamos servidor
app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});

// // Creamos un servidor
// const server = app.listen(8080, () => {
//     console.log("Servidor escuchando en el puerto 8080");
// });
