const express = require("express");
const app = express();

app.use(express.static("public"));

// Ruta principal
// app.get("/", (req, res) => {
//   res.send("Servidor Funcionando<br><br>Posibles endpoints:<br>- /saludo<br>- /saludo/:nombre<br>- /rafaelito<br>- /api<br>- /curso<br>- /alumno<br>- /profesor");
// });

app.get("/saludo", (req, res) => {
  res.send("¡Hola!");
});

app.get("/saludo/:nombre", (req, res) => {
  res.send("¡Hola " + req.params.nombre + "!");
});

app.get("/rafaelito", (req, res) => {
  res.send("¡Rafaelito 🧑‍🏫!");
});

app.get("/api", (req, res) => {
  res.json({ api: "API Funcionando - OK" });
});

// ✅ CURSOS (ahora 5)
const cursos = [
  { id: 1, nombre: "Full Stack Web Development", duracion: "6 meses", tecnologias: ["HTML", "CSS", "JavaScript", "Node.js"] },
  { id: 2, nombre: "Data Science", duracion: "6 meses", tecnologias: ["ETL", "Python", "R", "SQL"] },
  { id: 3, nombre: "Machine Learning", duracion: "6 meses", tecnologias: ["pandas", "numpy", "scikit-learn", "TensorFlow"] },
  { id: 4, nombre: "Ciberseguridad", duracion: "5 meses", tecnologias: ["Networking", "Linux", "Ethical Hacking"] },
  { id: 5, nombre: "DevOps", duracion: "4 meses", tecnologias: ["Docker", "Kubernetes", "CI/CD"] }
];

app.get("/curso", (req, res) => {
  res.json(cursos);
});

// ✅ 20 ALUMNOS RANDOM
const alumnos = [
  { id: 1, nombre: "Carlos", apellido: "García", edad: 22, sexo: "H" },
  { id: 2, nombre: "Lucía", apellido: "Martínez", edad: 25, sexo: "M" },
  { id: 3, nombre: "Pedro", apellido: "Sánchez", edad: 28, sexo: "H" },
  { id: 4, nombre: "Ana", apellido: "López", edad: 21, sexo: "M" },
  { id: 5, nombre: "Miguel", apellido: "Fernández", edad: 30, sexo: "H" },
  { id: 6, nombre: "Laura", apellido: "Díaz", edad: 24, sexo: "M" },
  { id: 7, nombre: "Jorge", apellido: "Ruiz", edad: 27, sexo: "H" },
  { id: 8, nombre: "Sara", apellido: "Moreno", edad: 23, sexo: "M" },
  { id: 9, nombre: "Alberto", apellido: "Muñoz", edad: 26, sexo: "H" },
  { id: 10, nombre: "Elena", apellido: "Álvarez", edad: 29, sexo: "M" },
  { id: 11, nombre: "David", apellido: "Romero", edad: 20, sexo: "H" },
  { id: 12, nombre: "Paula", apellido: "Navarro", edad: 22, sexo: "M" },
  { id: 13, nombre: "Raúl", apellido: "Torres", edad: 31, sexo: "H" },
  { id: 14, nombre: "Clara", apellido: "Domínguez", edad: 23, sexo: "M" },
  { id: 15, nombre: "Antonio", apellido: "Vázquez", edad: 35, sexo: "H" },
  { id: 16, nombre: "Marta", apellido: "Castro", edad: 28, sexo: "M" },
  { id: 17, nombre: "Sergio", apellido: "Ortega", edad: 26, sexo: "H" },
  { id: 18, nombre: "Irene", apellido: "Rubio", edad: 24, sexo: "M" },
  { id: 19, nombre: "Hugo", apellido: "Molina", edad: 27, sexo: "H" },
  { id: 20, nombre: "Nuria", apellido: "Santos", edad: 29, sexo: "M" }
];

app.get("/alumno", (req, res) => {
  res.json(alumnos);
});

// ✅ 5 PROFESORES
const profesores = [
  { id: 1, nombre: "Jorge", apellido: "Pérez", edad: 40, sexo: "H" },
  { id: 2, nombre: "María", apellido: "Gómez", edad: 38, sexo: "M" },
  { id: 3, nombre: "Luis", apellido: "Herrera", edad: 45, sexo: "H" },
  { id: 4, nombre: "Carmen", apellido: "Vidal", edad: 42, sexo: "M" },
  { id: 5, nombre: "Andrés", apellido: "Serrano", edad: 50, sexo: "H" }
];

app.get("/profesor", (req, res) => {
  res.json(profesores);
});

// Servidor
app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});