const express = require('express');
const cors = require('cors');
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json()); // <<<< ---- Imprescindible esta línea para que funcionen las peticiones CRUD (POST, DELETE...)

// Las listas hardcodeadas se han movido al fichero data.json
// // Catálogo 1
// const listaA = [
// { id: 1, item: "Elemento A1" },
// { id: 2, item: "Elemento A2" }
// ];
// // Catálogo 2
// const listaB = [
// { id: 1, item: "Elemento B1" },
// { id: 2, item: "Elemento B2" }
// ];

// Llamada al fichero data.json que contiene ahora nuestras listas
let data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
let listaA = data.listaA;
let listaB = data.listaB;

function guardarDatos() {
  fs.writeFileSync("data.json", JSON.stringify({ listaA, listaB }, null, 2));
}


// Ruta Principal (Mensaje de bienvenida en texto plano)
app.get('/', (req, res) => {
res.send('🔥Servidor activo. Prueba /api/primera o /api/segunda🔥');
});
// Ruta 1
app.get('/api/primera', (req, res) => {
res.json(listaA);
});
// Ruta 2
app.get('/api/segunda', (req, res) => {
res.json(listaB);
});

// Rutas CRUD, empezamos por añadir elementos a los catálogos (listas)
app.post("/api/add", (req, res) => {
  const { lista, item } = req.body;

  if (!lista || !item) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  let targetList;

  if (lista === "A") {
    targetList = listaA;
  } else if (lista === "B") {
    targetList = listaB;
  } else {
    return res.status(400).json({ error: "Lista desconocida" });
  }

  // Calcular siguiente ID correlativo
  const nextId = targetList.length > 0
    ? Math.max(...targetList.map(e => e.id)) + 1
    : 1;

  targetList.push({ id: nextId, item });
  guardarDatos();

  res.json({ mensaje: "Elemento añadido", listaA, listaB });
});

// Continuamos con los endpoints de borrado por id
app.delete("/api/delete", (req, res) => {
  const { lista, id } = req.body;

  if (!lista || !id) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  let targetList;

  if (lista === "A") {
    targetList = listaA;
  } else if (lista === "B") {
    targetList = listaB;
  } else {
    return res.status(400).json({ error: "Lista desconocida" });
  }

  const index = targetList.findIndex(e => e.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Elemento no encontrado" });
  }

  targetList.splice(index, 1);
  guardarDatos();

  res.json({ mensaje: "Elemento borrado", listaA, listaB });
});



// Encendemos el motor en el puerto 3000
app.listen(3000, () => {
console.log('✅ Servidor personalizado funcionando en el puerto 3000');
console.log('Haz CTRL+click en el siguiente enlace: http://localhost:3000');
console.log('para abrir el navegador con el servidor funcionando...');
});