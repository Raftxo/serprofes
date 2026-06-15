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
  res.send("Servidor Funcionando<br><br>Posibles endpoints:<br>- /saludo<br>- /saludo/:nombre<br>- /rafaelito<br>- /api<br>- /curso<br>- /alumno<br>- /profesor");
});

// Creamos otra ruta
app.get("/saludo", (req, res) => {
  res.send("¡Hola!");
});

// Creamos otro endpoint
app.get("/saludo/:nombre", (req, res) => {
  res.send("¡Hola " + req.params.nombre + "!");
});

// Otro endpoint
app.get("/rafaelito", (req, res) => {
  res.send("¡Rafaelito 🧑‍🏫!");
});

app.get("/api", (req, res) => {
  res.json({ api: "API Funcionando - OK" });
});

const cursos = [
  {
    id: 1,
    nombre: "Full Stack Web Development",
    duracion: "6 meses",
    tecnologias: ["HTML", "CSS", "JavaScript", "Node.js"],
  },
  {
    id: 2,
    nombre: "Data Science",
    duracion: "6 meses",
    tecnologias: ["ETL", "Python", "R", "SQL"],
  },
  {
    id: 3,
    nombre: "Machine Learning",
    duracion: "6 meses",
    tecnologias: ["pandas", "numpy", "scikit-learn", "TensorFlow"],
  },
]

app.get("/curso", (req, res) => {
  res.json(cursos);
});

const alumnos = [
  {
    id: 101,
    nombre: "Rafa",
    curso: "Full Stack",
    activo: true
  },
  {
    id: 102,
    nombre: "Ana",
    curso: "Front-End",
    activo: true
  },
  {
    id: 103,
    nombre: "Luis",
    curso: "Back-End",
    activo: false
  }
];

app.get("/alumno", (req, res) => {
  res.json(alumnos);
});

app.get("/profesor", (req, res) => {
  res.json({
    id: 1,
    nombre: "Jorge 🧑‍🏫",
    especialidad: "Backend & Node.js",
  });
});


// Arrancamos servidor
app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});

// // Creamos un servidor
// const server = app.listen(8080, () => {
//     console.log("Servidor escuchando en el puerto 8080");
// });
