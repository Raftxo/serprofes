// ==========================================================
// App.jsx
// Componente principal con manejo mejorado de errores,
// loading states y feedback visual sin alert().
// ==========================================================
import { useState, useEffect, useCallback } from "react";
import MovieList from "./components/MovieList.jsx";
import MovieForm from "./components/MovieForm.jsx";
import ErrorBanner from "./components/ErrorBanner.jsx";
import ProjectInfo from "./components/ProjectInfo.jsx";
import {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
  checkBackendHealth,
} from "./services/movieService.js";

const BACKEND_PORT = 3000;

function App() {
  const [movies, setMovies] = useState([]);
  const [backendStatus, setBackendStatus] = useState("checking");
  const [editingMovie, setEditingMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showProtections, setShowProtections] = useState(false);

  const toggleProtections = () => setShowProtections((prev) => !prev);

  const cargarPeliculas = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getMovies();
      setMovies(data);
      setBackendStatus("online");
      setError(null);
    } catch (err) {
      setBackendStatus("offline");
      setError({
        message: "No se pudo conectar con el backend",
        details: err.message,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargarPeliculas();
  }, [cargarPeliculas]);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        await checkBackendHealth();
        setBackendStatus("online");
      } catch (err) {
        setBackendStatus("offline");
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleFormSubmit = async (movieData) => {
    try {
      if (editingMovie) {
        await updateMovie(editingMovie.id, movieData);
        setEditingMovie(null);
      } else {
        await createMovie(movieData);
      }
      await cargarPeliculas();
    } catch (err) {
      // Manejo específico del error 409 (duplicado)
      if (err.status === 409) {
        setError({
          message: "Película duplicada",
          details: err.details || "Ya existe una película con ese título.",
        });
      } else if (err.status === 429) {
        setError({
          message: "Demasiadas peticiones",
          details: "Has excedido el límite de peticiones. Espera un momento.",
        });
      } else {
        setError({
          message: "No se pudo guardar la película",
          details: err.details || err.message,
        });
      }
    }
  };

  const handleEditClick = (movie) => {
    setEditingMovie(movie);
    setError(null);
  };

  const handleCancelEdit = () => {
    setEditingMovie(null);
    setError(null);
  };

  const handleDeleteClick = async (id) => {
    const confirmado = window.confirm("¿Seguro que quieres eliminar esta película?");
    if (!confirmado) return;

    try {
      await deleteMovie(id);
      await cargarPeliculas();
    } catch (err) {
      setError({
        message: "No se pudo eliminar la película",
        details: err.details || err.message,
      });
    }
  };

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <div className="app-container">
      <div className={`app-layout ${showProtections ? "" : "app-layout--single"}`}>
        <main className="app-main">
          <header className="app-header">
            <h1>🎬 Catálogo de Películas</h1>

            <div className="status-group">
              {backendStatus === "online" && (
                <span className="status status-online">
                  🟢 Backend conectado en :{BACKEND_PORT}
                </span>
              )}
              {backendStatus === "offline" && (
                <span className="status status-offline">
                  🔴 Backend desconectado (:{BACKEND_PORT})
                </span>
              )}
              {backendStatus === "checking" && (
                <span className="status status-checking">
                  🟡 Comprobando conexión...
                </span>
              )}
              <button
                className="shield-button"
                onClick={toggleProtections}
                title={showProtections ? "Ocultar protecciones" : "Mostrar protecciones"}
                aria-label={showProtections ? "Ocultar protecciones" : "Mostrar protecciones"}
              >
                🛡️
              </button>
            </div>
          </header>

          <ErrorBanner
            message={error?.message}
            details={error?.details}
            onClose={clearError}
          />

          {backendStatus === "offline" && (
            <div className="offline-banner">
              No se puede conectar con <strong>http://localhost:{BACKEND_PORT}</strong>.
              <br />
              Comprueba que tu servidor Express esté encendido (<code>npm run dev</code>).
            </div>
          )}

          <MovieForm
            editingMovie={editingMovie}
            onSubmit={handleFormSubmit}
            onCancelEdit={handleCancelEdit}
            existingMovies={movies}
          />

          {loading ? (
            <div className="loading-state">
              <p>⏳ Cargando películas...</p>
            </div>
          ) : (
            <MovieList
              movies={movies}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          )}
        </main>

        {showProtections && <ProjectInfo />}
      </div>
    </div>
  );
}

export default App;