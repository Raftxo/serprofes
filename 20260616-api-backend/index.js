// 1. IMPORTACIÓN DE MÓDULOS
// Importamos el módulo express
const express = require('express');

// 2. CREACIÓN DEL SERVIDOR
const app = express();

// 3. MIDDLEWARE (la línea mágica)
// Esto es un traductor de peticiones y respuestas
// Le dice a Node si alguien te envía datos desde fuera; tradúcelos a formato JSON
// Si falta esto el POST falla

app.use(express.json());

// Nuestra base de datos
// Guardamos información temporalmente en una lista array
// dentro de la memoria del servidor

let estudiantes = [
    { id: 1, nombre: 'Aroa', curso: 'MongoDB' },
    { id: 2, nombre: 'Jose', curso: 'Express' },
    { id: 3, nombre: 'Laura', curso: 'React' },
    { id: 4, nombre: 'Alexa', curso: 'Node' },
];

//  📌 ruta get: para leer datos
// cuando alguien pregunte por "api/estudiantes", el servidor muestra la lista de estudiantes

app.get('/api/estudiantes', (req, res) => {
    res.json(estudiantes);
});

// ruta para escribir datos (guardar datos nuevos)
// ruta post: para escribir datos
// cuando alguien envíe datos a "api/estudiantes", el servidor guarda el nuevo estudiante
app.post('/api/estudiantes', (req, res) => {
    // atrapamos los datos que vienen de fuera (viven dentro de req.body)
    const nuevoEstudiante = req.body;
    // agregamos el nuevo estudiante a la base de datos
    estudiantes.push(nuevoEstudiante);
    // respondemos con un mensajito de confirmación
    res.json({ 
        mensaje: 'Estudiante creado correctamente',
        listaActualizada: estudiantes
     });
    // respondemos con la base de datos actualizada
    res.json(estudiantes);
});

// X. CREACIÓN DEL SERVIDOR 🚂 (encendemos los motores)
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});

