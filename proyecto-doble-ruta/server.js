const express = require('express');
const app = express();
// Catálogo 1
const listaA = [
{ id: 1, item: "Elemento A1" },
{ id: 2, item: "Elemento A2" }
];
// Catálogo 2
const listaB = [
{ id: 1, item: "Elemento B1" },
{ id: 2, item: "Elemento B2" }
];
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
// Encendemos el motor en el puerto 3000
app.listen(3000, () => {
console.log('✅ Servidor personalizado funcionando en el puerto 3000');
console.log('Haz CTRL+click en el siguiente enlace: http://localhost:3000');
console.log('para abrir el navegador con el servidor funcionando...');
});