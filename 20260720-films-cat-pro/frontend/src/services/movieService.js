// ==========================================================
// movieService.js
// Comunicación con el backend mejorada con manejo de errores
// ==========================================================

const API_URL = "/api/peliculas";

/**
 * Maneja respuestas de error del backend
 */
async function handleResponse(response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    
    const error = new Error(errorData.error || 'Error desconocido');
    error.status = response.status;
    error.details = errorData.details || error.message;
    
    throw error;
  }
  
  return await response.json();
}

// ------------------------------------------------------------
// GET /api/peliculas -> Obtener todas las películas
// ------------------------------------------------------------
export async function getMovies() {
  const response = await fetch(API_URL);
  return handleResponse(response);
}

// ------------------------------------------------------------
// POST /api/peliculas -> Crear una película nueva
// ------------------------------------------------------------
export async function createMovie(movie) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  });
  
  return handleResponse(response);
}

// ------------------------------------------------------------
// PUT /api/peliculas/:id -> Actualizar una película existente
// ------------------------------------------------------------
export async function updateMovie(id, movie) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  });
  
  return handleResponse(response);
}

// ------------------------------------------------------------
// DELETE /api/peliculas/:id -> Eliminar una película
// ------------------------------------------------------------
export async function deleteMovie(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  
  return handleResponse(response);
}
