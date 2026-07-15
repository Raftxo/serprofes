//==================================
//1. IMPORTACIONES
//==================================
const express = require("express");
const cors = require("cors");// Importamos nuestro guardián de seguridad

//=============================================
//2. INICIALIZACIÓN
//=============================================
const app = express();

//=============================================
//3. MIDDLEWARES (CONFIGURACIÓN GLOBAL)
//=============================================
//REGLA DE ORO: ¡CORS SIEMPRE ANTES DE LAS RUTAS!
app.use(cors());// Da permiso a React para entrar sin que el navegador lo bloquee
app.use(express.json());// Traduce el texto entrante a formato JSON

// 3 y medio: función para obtener portadas
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));


async function obtenerPortada(titulo) {
    const apiKey = "TU_API_KEY"; // pon aquí tu API Key de TMDb
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(titulo)}`;

    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    if (!datos.results || datos.results.length === 0) {
        return null;
    }

    const pelicula = datos.results[0];

    return `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`;
}


//===============================================
//4. NUESTRA BASE DE DATOS
//===============================================
let peliculas = [
    {id:1, titulo: "Matrix", director: "Lana Wachowski"},
    {id:2, titulo: "Interstellar", director: "Christopher Nolan"}
];

//================================================
//5. RUTAS DE LA API (CRUD)
//================================================
// Leer el catálogo completo (GET)
app.get("/api/peliculas", (req,res)=>{
    res.json(peliculas);
});

//Añadir una película nueva (POST)
app.post("/api/peliculas", async (req, res) => {
    const { titulo, director } = req.body;

    if (!titulo || !director) {
        return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const portada = await obtenerPortada(titulo);

    const nuevaPelicula = {
        id: peliculas.length > 0 ? peliculas[peliculas.length - 1].id + 1 : 1,
        titulo,
        director,
        portada
    };

    peliculas.push(nuevaPelicula);
    res.status(201).json(nuevaPelicula);
});


//Actualizar una película existente (PUT)
app.put("/api/peliculas/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const { titulo, director } = req.body;

    if (!titulo || !director) {
        return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const pelicula = peliculas.find(p => p.id === id);

    if (!pelicula) {
        return res.status(404).json({ error: "Película no encontrada" });
    }

    // Si el título ha cambiado, buscamos una nueva portada
    let nuevaPortada = pelicula.portada;
    if (pelicula.titulo !== titulo) {
        nuevaPortada = await obtenerPortada(titulo);
    }

    pelicula.titulo = titulo;
    pelicula.director = director;
    pelicula.portada = nuevaPortada;

    res.json(pelicula);
});


//Eliminar una película (DELETE)

app.delete("/api/peliculas/:id", (req,res) => {
    const id = parseInt(req.params.id);
    const index = peliculas.findIndex(p  => p.id === id);

    if(index !== -1){
        peliculas.splice(index,1);
        res.json({mensaje: "Pelicula eliminada del catálogo"});
    }else {
        res.status(404).json({ error: "Película no encontrada"});
    }
});






async function completarPortadasIniciales() {
    for (let pelicula of peliculas) {
        const portada = await obtenerPortada(pelicula.titulo);
        pelicula.portada = portada;
    }

    console.log("🎨 Portadas iniciales cargadas desde TMDb");
}

completarPortadasIniciales().then(() => {
    app.listen(3000, () => {
        console.log("🎬 Servidor de películas listo en el puerto 3000 (CORS Activado)");
    });
});
