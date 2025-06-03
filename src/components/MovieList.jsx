import MovieCard from './MovieCard'
import './MovieList.css'

function MovieList({ movies, viewMode, onUpdateMovie, onDeleteMovie, onToggleFavorite }) {
  if (movies.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon"></div>
        <h3>No movies found</h3>
        <p>Start building your collection by adding your first movie!</p>
      </div>
    )
  }

  return (
    <div className={`movie-list ${viewMode}`}>
      {movies.map(movie => (
        <MovieCard
          key={movie.id}
          movie={movie}
          viewMode={viewMode}
          onUpdate={onUpdateMovie}
          onDelete={onDeleteMovie}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  )
}

export default MovieList