// ==========================================================
// Backend de Videojuegos con portadas automáticas (RAWG)
// ==========================================================

const express = require("express");
const cors = require("cors");

// node-fetch compatible con Node 26 + CommonJS
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();
app.use(cors());
app.use(express.json());

// ==========================================================
// Catálogo inicial
// ==========================================================
let videojuegos = [
  { id: 1, titulo: "The Legend of Zelda: Breath of the Wild", plataforma: "Nintendo Switch" },
  { id: 2, titulo: "Halo Infinite", plataforma: "Xbox Series X" }
];

// ==========================================================
// RAWG: obtener portada por título
// ==========================================================
async function obtenerPortadaRAWG(nombre) {
  const apiKey = "TU_RAWG_API_KEY";

  const url = `https://api.rawg.io/api/games?key=${apiKey}&search=${encodeURIComponent(nombre)}`;

  const respuesta = await fetch(url);
  const datos = await respuesta.json();

  if (!datos.results || datos.results.length === 0) return null;

  const juego = datos.results[0];

  return juego.background_image || null;
}

// ==========================================================
// Completar portadas del catálogo inicial
// ==========================================================
async function completarPortadasIniciales() {
  for (let juego of videojuegos) {
    juego.portada = await obtenerPortadaRAWG(juego.titulo);
  }
  console.log("🎮 Portadas iniciales cargadas desde RAWG");
}

// ==========================================================
// GET: obtener todos los videojuegos
// ==========================================================
app.get("/api/videojuegos", (req, res) => {
  res.json(videojuegos);
});

// ==========================================================
// POST: crear videojuego con portada automática
// ==========================================================
app.post("/api/videojuegos", async (req, res) => {
  const { titulo, plataforma } = req.body;

  if (!titulo || !plataforma) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  const portada = await obtenerPortadaRAWG(titulo);

  const nuevoJuego = {
    id: videojuegos.length > 0 ? videojuegos[videojuegos.length - 1].id + 1 : 1,
    titulo,
    plataforma,
    portada
  };

  videojuegos.push(nuevoJuego);
  res.status(201).json(nuevoJuego);
});

// ==========================================================
// PUT: editar videojuego (actualiza portada si cambia el título)
// ==========================================================
app.put("/api/videojuegos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { titulo, plataforma } = req.body;

  const juego = videojuegos.find(j => j.id === id);
  if (!juego) return res.status(404).json({ error: "Videojuego no encontrado" });

  let nuevaPortada = juego.portada;

  if (juego.titulo !== titulo) {
    nuevaPortada = await obtenerPortadaRAWG(titulo);
  }

  juego.titulo = titulo;
  juego.plataforma = plataforma;
  juego.portada = nuevaPortada;

  res.json(juego);
});

// ==========================================================
// DELETE: eliminar videojuego
// ==========================================================
app.delete("/api/videojuegos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  videojuegos = videojuegos.filter(j => j.id !== id);
  res.json({ mensaje: "Videojuego eliminado" });
});

// ==========================================================
// Iniciar servidor
// ==========================================================
completarPortadasIniciales().then(() => {
  app.listen(3002, () => {
    console.log("🎮 Servidor de videojuegos (RAWG) listo en el puerto 3002");
  });
});
