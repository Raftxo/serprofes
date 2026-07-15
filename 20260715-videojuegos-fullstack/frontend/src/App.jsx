import { useState, useEffect } from "react";
import VideoGameList from "./components/VideoGameList.jsx";
import VideoGameForm from "./components/VideoGameForm.jsx";
import {
  getGames,
  createGame,
  updateGame,
  deleteGame,
} from "./services/videoGameService.js";

function App() {
  const [games, setGames] = useState([]);
  const [backendStatus, setBackendStatus] = useState("checking");
  const [editingGame, setEditingGame] = useState(null);

  useEffect(() => {
    cargarVideojuegos();
  }, []);

  const cargarVideojuegos = async () => {
    try {
      const data = await getGames();
      setGames(data);
      setBackendStatus("online");
    } catch (error) {
      setBackendStatus("offline");
    }
  };

  const handleFormSubmit = async (gameData) => {
    try {
      if (editingGame) {
        await updateGame(editingGame.id, gameData);
        setEditingGame(null);
      } else {
        await createGame(gameData);
      }
      await cargarVideojuegos();
    } catch (error) {
      setBackendStatus("offline");
      alert("No se pudo guardar el videojuego. Revisa que el backend esté encendido.");
    }
  };

  const handleEditClick = (game) => {
    setEditingGame(game);
  };

  const handleCancelEdit = () => {
    setEditingGame(null);
  };

  const handleDeleteClick = async (id) => {
    const confirmado = confirm("¿Seguro que quieres eliminar este videojuego?");
    if (!confirmado) return;

    try {
      await deleteGame(id);
      await cargarVideojuegos();
    } catch (error) {
      setBackendStatus("offline");
      alert("No se pudo eliminar el videojuego. Revisa que el backend esté encendido.");
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🎮 Catálogo de Videojuegos</h1>

        {backendStatus === "online" && (
          <span className="status status-online">🟢 Backend conectado</span>
        )}
        {backendStatus === "offline" && (
          <span className="status status-offline">🔴 Backend desconectado</span>
        )}
        {backendStatus === "checking" && (
          <span className="status status-checking">🟡 Comprobando conexión...</span>
        )}
      </header>

      {backendStatus === "offline" && (
        <div className="offline-banner">
          No se puede conectar con <strong>http://localhost:3002</strong>.
          <br />
          Comprueba que tu servidor Express esté encendido (<code>node server.js</code>).
        </div>
      )}

      <VideoGameForm
        editingGame={editingGame}
        onSubmit={handleFormSubmit}
        onCancelEdit={handleCancelEdit}
      />

      <VideoGameList
        games={games}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />
    </div>
  );
}

export default App;
