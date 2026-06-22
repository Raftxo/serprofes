// 1. IMPORTACIÓN
const express = require('express');
const cors = require('cors');

// 2. CREACIÓN DEL SERVIDOR
const app = express();

// 3. MIDDLEWARE (damos permiso a recibir JSON y cors)
app.use(express.json());
app.use(cors());

// ===== BASE DE DATOS =====
let estudiantes = [
    { id: 1, nombre: 'Aroa', curso: 'MongoDB' },
    { id: 2, nombre: 'Jose', curso: 'Express' },
    { id: 3, nombre: 'Laura', curso: 'React' },
    { id: 4, nombre: 'Alexa', curso: 'Node' },
];

// ===== RESUMEN DE ENDPOINTS =====
app.get('/', (req, res) => {
    res.json({
        mensaje: 'API de estudiantes y profesores',
        endpoints: {
            estudiantes: [
                'GET /api/estudiantes',
                'POST /api/estudiantes',
                'GET /api/estudiantes/:id',
                'PUT /api/estudiantes/:id',
                'DELETE /api/estudiantes/:id'
            ],
            profesores: [
                'GET /api/profesores',
                'POST /api/profesores',
                'GET /api/profesores/:id',
                'PUT /api/profesores/:id',
                'DELETE /api/profesores/:id'
            ]
        }
    });
});

// ===== GET ESTUDIANTES =====
app.get('/api/estudiantes', (req, res) => {
    res.json(estudiantes);
});

// ===== POST ESTUDIANTES =====
app.post('/api/estudiantes', (req, res) => {
    const { nombre, curso } = req.body;

    // RETO 3: VALIDACIÓN
    if (!nombre || !curso || nombre.trim() === '' || curso.trim() === '') {
        return res.status(400).json({ error: 'El nombre y el curso son obligatorios' });
    }

    // RETO 2: ID AUTOMÁTICO
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

// RUTAS DINÁMICAS (CRUD COMPLETO)

// ===== GET ESTUDIANTES POR ID =====
// al usar early return se corta la ejecución de la función por lo cual no hace falta el else
app.get('/api/estudiantes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const estudiante = estudiantes.find(estudiante => estudiante.id === id);

    if (!estudiante) {
        return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    res.json(estudiante);
});

// ✏️ actualizar estudiante: PUT
app.put('/api/estudiantes/:id', (req, res) => {
    const idActualizar = parseInt(req.params.id);
    const indice = estudiantes.findIndex(estudiante => estudiante.id === idActualizar);
// otra vez usamos early return
    if (indice === -1) {
        return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    const { nombre, curso } = req.body;

    // RETO 3: VALIDACIÓN
    if (!nombre || !curso || nombre.trim() === '' || curso.trim() === '') {
        return res.status(400).json({ error: 'El nombre y el curso son obligatorios' });
    }

    estudiantes[indice].nombre = nombre;
    estudiantes[indice].curso = curso;

    res.json({
        mensaje: 'Estudiante actualizado correctamente',
        estudiante: estudiantes[indice]
    });
});

// 🗑️ eliminar estudiante: DELETE
app.delete('/api/estudiantes/:id', (req, res) => {
    const idEliminar = parseInt(req.params.id);
    const indice = estudiantes.findIndex(estudiante => estudiante.id === idEliminar);

    if (indice === -1) {
        return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    estudiantes.splice(indice, 1);

    res.json({
        mensaje: 'Estudiante eliminado correctamente',
        estudiantes
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

    // RETO 3: VALIDACIÓN
    if (!nombre || !asignatura || nombre.trim() === '' || asignatura.trim() === '') {
        return res.status(400).json({ error: 'El nombre y la asignatura son obligatorios' });
    }

    const nuevoProfesor = {
        id: profesores.length + 1,
        nombre,
        asignatura
    };

    profesores.push(nuevoProfesor);

    res.status(201).json(nuevoProfesor);
});

// ===== GET PROFESORES POR ID =====
app.get('/api/profesores/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const profesor = profesores.find(profesor => profesor.id === id);

    if (!profesor) {
        return res.status(404).json({ error: 'Profesor no encontrado' });
    }

    res.json(profesor);
});

// ✏️ actualizar profesor: PUT
app.put('/api/profesores/:id', (req, res) => {
    const idActualizar = parseInt(req.params.id);
    const indice = profesores.findIndex(profesor => profesor.id === idActualizar);

    if (indice === -1) {
        return res.status(404).json({ error: 'Profesor no encontrado' });
    }

    const { nombre, asignatura } = req.body;

    // RETO 3: VALIDACIÓN
    if (!nombre || !asignatura || nombre.trim() === '' || asignatura.trim() === '') {
        return res.status(400).json({ error: 'El nombre y la asignatura son obligatorios' });
    }

    profesores[indice].nombre = nombre;
    profesores[indice].asignatura = asignatura;

    res.json({
        mensaje: 'Profesor actualizado correctamente',
        profesor: profesores[indice]
    });
});

// 🗑️ eliminar profesor: DELETE
app.delete('/api/profesores/:id', (req, res) => {
    const idEliminar = parseInt(req.params.id);
    const indice = profesores.findIndex(profesor => profesor.id === idEliminar);

    if (indice === -1) {
        return res.status(404).json({ error: 'Profesor no encontrado' });
    }

    profesores.splice(indice, 1);

    res.json({
        mensaje: 'Profesor eliminado correctamente',
        profesores
    });
});

// PASO FINAL: ===== SERVIDOR =====
app.listen(3000, () => {
    console.log('🏃‍♀️‍➡️🏃‍♀️‍➡️🏃‍♂️‍➡️ Servidor corriendo en http://localhost:3000 🏃‍♀️🏃‍♂️🏃‍♀️');
});
