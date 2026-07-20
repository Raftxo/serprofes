//==================================
//1. IMPORTACIONES
//==================================
const express = require("express");
const cors = require("cors");
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const { validateMovieData } = require('./middleware/validate');
const { apiLimiter } = require('./middleware/rateLimiter');

//=============================================
//2. INICIALIZACIÓN
//=============================================
const app = express();
const DATA_FILE = path.join(__dirname, 'data', 'peliculas.json');

//=============================================
//3. MIDDLEWARES (CONFIGURACIÓN GLOBAL)
//=============================================
app.use(cors());
app.use(express.json());
app.use('/api/', apiLimiter); // Aplicar rate limiting a todas las rutas de /api/

//=============================================
//3.5. FUNCIÓN PARA OBTENER PORTADAS (TMDb)
//=============================================
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const PORTADA_GENERICA = '/img/sin-portada.svg';

async function obtenerPortada(titulo) {
    const apiKey = process.env.TMDB_API_KEY;
    if (!apiKey) {
        console.error("Error: TMDB_API_KEY no está configurada en el archivo .env");
        return PORTADA_GENERICA;
    }

    const url = const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(titulo)}&language=es-ES`;
    console.log(`[TMDb] Buscando portada para: "${titulo}"`);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
        const respuesta = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!respuesta.ok) {
            console.error(`[TMDb] Error para "${titulo}": ${respuesta.status}`);
            return PORTADA_GENERICA;
        }

        const datos = await respuesta.json();

        if (!datos.results || datos.results.length === 0) {
            console.warn(`[TMDb] No se encontraron resultados para "${titulo}"`);
            return PORTADA_GENERICA;
        }

        const pelicula = datos.results[0];

        if (!pelicula.poster_path) {
            console.warn(`[TMDb] No hay poster para "${titulo}"`);
            return PORTADA_GENERICA;
        }

        return `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`;
    } catch (error) {
        if (error.name === 'AbortError') {
            console.error(`[TMDb] Timeout al obtener "${titulo}"`);
        } else {
            console.error(`[TMDb] Error al obtener "${titulo}":`, error.message);
        }
        return PORTADA_GENERICA;
    } finally {
        clearTimeout(timeoutId);
    }
}

//=============================================
//4. PERSISTENCIA DE DATOS
//=============================================

/**
 * Carga las películas desde el archivo JSON
 */
function cargarPeliculas() {
    try {
        if (fs.existsSync(DATA_FILE)) {
            const data = fs.readFileSync(DATA_FILE, 'utf8');
            return JSON.parse(data);
        }
    } catch (error) {
        console.error('Error al cargar películas:', error.message);
    }
    return [];
}

/**
 * Guarda las películas en el archivo JSON
 */
function guardarPeliculas(peliculas) {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(peliculas, null, 2), 'utf8');
    } catch (error) {
        console.error('Error al guardar películas:', error.message);
    }
}

/**
 * Genera un ID único autoincremental
 */
function generarId(peliculas) {
    if (peliculas.length === 0) return 1;
    const maxId = Math.max(...peliculas.map(p => p.id));
    return maxId + 1;
}

//=============================================
//5. BASE DE DATOS (CARGA INICIAL)
//=============================================
let peliculas = cargarPeliculas();

//================================================
//6. RUTAS DE LA API (CRUD)
//================================================

// Leer el catálogo completo (GET)
app.get("/api/peliculas", (req, res) => {
    res.json(peliculas);
});

// Añadir una película nueva (POST) - CON VALIDACIÓN Y PROTECCIÓN ANTIDUPLICADOS
app.post("/api/peliculas", validateMovieData, async (req, res) => {
    const { titulo, director } = req.body;

    // PROTECCIÓN: Verificar que no exista ya una película con el mismo título (case-insensitive)
    const existe = peliculas.find(
        p => p.titulo.toLowerCase() === titulo.toLowerCase()
    );

    if (existe) {
        return res.status(409).json({
            error: 'Película duplicada',
            details: `Ya existe una película con el título "${titulo}"`
        });
    }

    const portada = await obtenerPortada(titulo);

    const nuevaPelicula = {
        id: generarId(peliculas),
        titulo,
        director,
        portada
    };

    peliculas.push(nuevaPelicula);
    guardarPeliculas(peliculas); // PERSISTENCIA

    res.status(201).json(nuevaPelicula);
});

// Actualizar una película existente (PUT) - CON VALIDACIÓN Y PROTECCIÓN ANTIDUPLICADOS
app.put("/api/peliculas/:id", validateMovieData, async (req, res) => {
    const id = parseInt(req.params.id);
    const { titulo, director } = req.body;

    const pelicula = peliculas.find(p => p.id === id);

    if (!pelicula) {
        return res.status(404).json({ error: "Película no encontrada" });
    }

    // PROTECCIÓN: Si el título cambió, verificar que no exista otra película con ese título
    if (pelicula.titulo.toLowerCase() !== titulo.toLowerCase()) {
        const existe = peliculas.find(
            p => p.titulo.toLowerCase() === titulo.toLowerCase() && p.id !== id
        );

        if (existe) {
            return res.status(409).json({
                error: 'Película duplicada',
                details: `Ya existe otra película con el título "${titulo}"`
            });
        }
    }

    // Si el título ha cambiado, buscamos una nueva portada
    let nuevaPortada = pelicula.portada;
    if (pelicula.titulo !== titulo) {
        nuevaPortada = await obtenerPortada(titulo);
    }

    pelicula.titulo = titulo;
    pelicula.director = director;
    pelicula.portada = nuevaPortada;

    guardarPeliculas(peliculas); // PERSISTENCIA

    res.json(pelicula);
});

// Eliminar una película (DELETE)
app.delete("/api/peliculas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = peliculas.findIndex(p => p.id === id);

    if (index !== -1) {
        peliculas.splice(index, 1);
        guardarPeliculas(peliculas); // PERSISTENCIA
        res.json({ mensaje: "Película eliminada del catálogo" });
    } else {
        res.status(404).json({ error: "Película no encontrada" });
    }
});

//================================================
//7. MANEJO GLOBAL DE ERRORES
//================================================
app.use((err, req, res, next) => {
    console.error('Error no manejado:', err);
    res.status(500).json({
        error: 'Error interno del servidor',
        details: process.env.NODE_ENV === 'development' ? err.message : 'Algo salió mal'
    });
});

// Ruta 404 para endpoints inexistentes
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

//================================================
//8. INICIALIZACIÓN DEL SERVIDOR
//================================================
async function completarPortadasIniciales() {
    for (let pelicula of peliculas) {
        if (!pelicula.portada || pelicula.portada === PORTADA_GENERICA) {
            const portada = await obtenerPortada(pelicula.titulo);
            pelicula.portada = portada;
        }
    }
    guardarPeliculas(peliculas);
    console.log("🎨 Portadas iniciales cargadas desde TMDb");
}

completarPortadasIniciales().then(() => {
    app.listen(3000, () => {
        console.log("🎬 Servidor de películas listo en el puerto 3000");
        console.log("🔒 Protecciones activas: validación, antiduplicados, rate limiting");
    });
});