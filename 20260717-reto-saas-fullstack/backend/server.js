// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Rutas
app.get('/api/libros', (req, res) => {
    res.json(libros);
});

app.post('/api/libros', (req, res) => {
    const { titulo, autor, año, categoria, estado } = req.body;
    const nuevoLibro = {
        id: libros.length > 0 ? libros[libros.length - 1].id + 1 : 1,
        titulo,
        autor,
        año,
        categoria,
        estado
    };
    libros.push(nuevoLibro);
    res.status(201).json(nuevoLibro);
});

app.put('/api/libros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const libro = libros.find(l => l.id === id);
    if (!libro) return res.status(404).json({ error: 'Libro no encontrado' });

    const { titulo, autor, año, categoria, estado } = req.body;
    libro.titulo = titulo;
    libro.autor = autor;
    libro.año = año;
    libro.categoria = categoria;
    libro.estado = estado;

    res.json(libro);
});

app.delete('/api/libros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = libros.findIndex(l => l.id === id);
    if (index === -1) return res.status(404).json({ error: 'Libro no encontrado' });

    libros.splice(index, 1);
    res.json({ mensaje: 'Libro eliminado' });
});

// Datos iniciales
let libros = [
    { id: 1, titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', año: 1967, categoria: 'Ficción', estado: 'Disponible' },
    { id: 2, titulo: 'El Quijote', autor: 'Miguel de Cervantes', año: 1605, categoria: 'Clásico', estado: 'Prestado' },
    { id: 3, titulo: 'El Alquimista', autor: 'Paulo Coelho', año: 1988, categoria: 'Autoayuda', estado: 'En reparación' }
];

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor de libros en http://localhost:${PORT}`);
});