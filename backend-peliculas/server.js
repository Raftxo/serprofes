const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;
// ZONA DE MIDDLEWARES GLOBALES (El orden de ejecución es sagrado)
app.use(cors()); // Autoriza el intercambio de recursos entre orígenes cruzados (p. ej.React en puerto 5173)
app.use(express.json()); // Intercepta los flujos de datos entrantes y los parsea a formato JSON ejecutable
// REPOSITORIO DE DATOS EN MEMORIA (Base de datos simulada)
let peliculas = [
  { id: 1, titulo: "Matrix", director: "Lana Wachowski", anio: 1999 },
  { id: 2, titulo: "Interstellar", director: "Christopher Nolan", anio: 2014 },
];

// Operación de Lectura Completa (GET)
app.get("/api/peliculas", (req, res) => {
  res.status(200).json(peliculas);
});
//Operación de Creación y Validación Estricta (POST)
app.post("/api/peliculas", (req, res) => {
  const { titulo, director, anio } = req.body;
  // VALIDACIÓN CRÍTICA: Control de campos vacíos u omitidos
  if (!titulo || !director || !anio) {
    return res
      .status(400)
      .json({
        error:
          "Faltan propiedades obligatorias: titulo, director y año son requeridos.",
      });
  }
  // LÓGICA DE CONTROL DE IDENTIFICADORES ÚNICOS (Evita duplicados tras eliminaciones)
  const nuevoId =
    peliculas.length > 0 ? peliculas[peliculas.length - 1].id + 1 : 1;
  const nuevaPelicula = {
    id: nuevoId,
    titulo: titulo,
    director: director,
    anio: parseInt(anio),
  };
  peliculas.push(nuevaPelicula);
  res
    .status(201)
    .json({ mensaje: "Recurso creado con éxito", pelicula: nuevaPelicula });
});

// DECLARACIÓN DE ENTRADA AL SERVIDOR
app.listen(PORT, () => {
  console.log(`\u2611 Servidor de películas operativo con éxito en
http://localhost:\${PORT}`);
});
