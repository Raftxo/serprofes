// 1. IMPORTACIÓN
const express = require('express');

// 2. CREACIÓN DEL SERVIDOR
const app = express();

// 3. MIDDLEWARE
app.use(express.json());

// ===== BASE DE DATOS =====
let estudiantes = [
    { id: 1, nombre: 'Aroa', curso: 'MongoDB' },
    { id: 2, nombre: 'Jose', curso: 'Express' },
    { id: 3, nombre: 'Laura', curso: 'React' },
    { id: 4, nombre: 'Alexa', curso: 'Node' },
];

// ===== GET ESTUDIANTES =====
app.get('/api/estudiantes', (req, res) => {
    res.json(estudiantes);
});

// ===== POST ESTUDIANTES =====
app.post('/api/estudiantes', (req, res) => {
    const { nombre, curso } = req.body;

    const nuevoEstudiante = {
        id: estudiantes.length + 1,
        nombre,
        curso
    };

    estudiantes.push(nuevoEstudiante);

    res.status(201).json({
        mensaje: 'Estudiante creado correctamente',
        estudiante: nuevoEstudiante
    });
});

// ===== PROFESORES =====
let profesores = [
    { id: 1, nombre: 'Señorita Aroa', asignatura: 'MongoDB advanced' },
    { id: 2, nombre: 'Profesor Jose', asignatura: 'Express Orient' },
    { id: 3, nombre: 'Profesora Laura', asignatura: 'React vs React Native' },
    { id: 4, nombre: 'Profesora Alexa', asignatura: 'Node vs Deno' },
];

// ===== GET PROFESORES =====
app.get('/api/profesores', (req, res) => {
    res.json(profesores);
});

// ===== POST PROFESORES =====
app.post('/api/profesores', (req, res) => {
    const { nombre, asignatura } = req.body;

    const nuevoProfesor = {
        id: profesores.length + 1,
        nombre,
        asignatura
    };

    profesores.push(nuevoProfesor);

    res.status(201).json(nuevoProfesor);
});

// ===== SERVIDOR =====
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});