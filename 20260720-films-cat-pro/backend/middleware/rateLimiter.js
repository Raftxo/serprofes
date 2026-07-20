// Configuración de rate limiting para proteger la API

const rateLimit = require('express-rate-limit');

// Limitar a 20 peticiones por minuto por IP
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 20, // 20 peticiones por ventana
  message: {
    error: 'Demasiadas peticiones',
    details: 'Has excedido el límite de 20 peticiones por minuto. Intenta de nuevo en un momento.'
  },
  standardHeaders: true, // Devuelve info de rate limit en headers `RateLimit-*`
  legacyHeaders: false, // Desactiva headers `X-RateLimit-*`
});

module.exports = { apiLimiter };