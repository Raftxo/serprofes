// Middleware de validación y sanitización de inputs

/**
 * Sanitiza un string: elimina espacios extra y caracteres peligrosos
 */
function sanitize(input) {
  if (typeof input !== 'string') return '';
  return input
    .trim()
    .replace(/[<>]/g, '') // Elimina < y > para prevenir XSS
    .substring(0, 200); // Limita a 200 caracteres
}

/**
 * Valida que los datos de una película sean correctos
 */
function validateMovieData(req, res, next) {
  const { titulo, director } = req.body;

  // Sanitizar inputs
  const tituloLimpio = sanitize(titulo);
  const directorLimpio = sanitize(director);

  // Validar campos obligatorios
  if (!tituloLimpio || !directorLimpio) {
    return res.status(400).json({ 
      error: 'Faltan datos obligatorios',
      details: 'Título y director son requeridos'
    });
  }

  // Validar longitud mínima
  if (tituloLimpio.length < 1 || directorLimpio.length < 1) {
    return res.status(400).json({ 
      error: 'Datos inválidos',
      details: 'Título y director no pueden estar vacíos'
    });
  }

  // Pasar datos sanitizados al siguiente middleware
  req.body.titulo = tituloLimpio;
  req.body.director = directorLimpio;
  
  next();
}

module.exports = { validateMovieData, sanitize };