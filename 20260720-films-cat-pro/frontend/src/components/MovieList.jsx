// ==========================================================
// MovieList.jsx
// Recibe el array completo de películas y pinta una
// MovieCard por cada una.
// ==========================================================
import MovieCard from "./MovieCard.jsx";

function MovieList({ movies, onEdit, onDelete }) {
  if (!movies || movies.length === 0) {
    return <p className="empty-message">No hay películas en el catálogo todavía.</p>;
  }

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default MovieList;