import { useState } from 'react'
import './MovieCard.css'

const STATUS_LABELS = {
  'want-to-watch': 'Want to Watch',
  'watching': 'Watching',
  'watched': 'Watched'
}

const STATUS_COLORS = {
  'want-to-watch': '#f39c12',
  'watching': '#3498db',
  'watched': '#27ae60'
}

function MovieCard({ movie, viewMode, onUpdate, onDelete, onToggleFavorite }) {
  const [showActions, setShowActions] = useState(false)

  const handleStatusChange = (newStatus) => {
    onUpdate(movie.id, { status: newStatus })
    setShowActions(false)
  }

  const handleFavoriteToggle = () => {
    if (onToggleFavorite) {
      onToggleFavorite(movie.id)
    } else {
      onUpdate(movie.id, { is_favorite: !movie.is_favorite })
    }
  }

  const handleRatingChange = (e) => {
    const rating = parseFloat(e.target.value) || null
    onUpdate(movie.id, { rating })
  }

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${movie.title}"?`)) {
      onDelete(movie.id)
    }
  }

  const getRatingColor = (rating) => {
    if (!rating) return '#6c757d'
    if (rating >= 8) return '#27ae60'
    if (rating >= 6) return '#f39c12'
    return '#e74c3c'
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString()
  }

  // Handle both API field names (is_favorite, date_added) and old field names
  const isFavorite = movie.is_favorite || movie.isFavorite
  const dateAdded = movie.date_added || movie.dateAdded

  if (viewMode === 'list') {
    return (
      <div className="movie-card list-view">
        <div className="movie-info">
          <div className="movie-header">
            <h3 className="movie-title">
              {movie.title}
              {isFavorite && <span className="favorite-icon">⭐</span>}
            </h3>
            <div className="movie-meta">
              <span className="movie-year">{movie.year}</span>
              <span className="movie-director">by {movie.director}</span>
              <span className="movie-genre">{movie.genre}</span>
            </div>
          </div>
          
          {movie.review && (
            <p className="movie-review">{movie.review}</p>
          )}
        </div>
        
        <div className="movie-actions">
          <div className="movie-rating">
            {movie.rating ? (
              <span className="rating-display" style={{ color: getRatingColor(movie.rating) }}>
                ⭐ {movie.rating}/10
              </span>
            ) : (
              <input
                type="number"
                className="rating-input"
                placeholder="Rate"
                min="1"
                max="10"
                step="0.1"
                onChange={handleRatingChange}
              />
            )}
          </div>
          
          <div 
            className="status-badge"
            style={{ backgroundColor: STATUS_COLORS[movie.status] }}
          >
            {STATUS_LABELS[movie.status]}
          </div>
          
          <div className="action-buttons">
            <button
              className="btn btn-icon"
              onClick={handleFavoriteToggle}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
            
            <div className="dropdown">
              <button
                className="btn btn-icon"
                onClick={() => setShowActions(!showActions)}
                title="More actions"
              >
                ⋮
              </button>
              
              {showActions && (
                <div className="dropdown-menu">
                  <button onClick={() => handleStatusChange('want-to-watch')}>
                    Want to Watch
                  </button>
                  <button onClick={() => handleStatusChange('watching')}>
                    Watching
                  </button>
                  <button onClick={() => handleStatusChange('watched')}>
                    Watched
                  </button>
                  <hr />
                  <button onClick={handleDelete} className="delete-action">
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="movie-card grid-view">
      <div className="movie-poster">
        <div className="poster-placeholder">
          
        </div>
        {isFavorite && (
          <div className="favorite-badge">⭐</div>
        )}
        <div 
          className="status-badge"
          style={{ backgroundColor: STATUS_COLORS[movie.status] }}
        >
          {STATUS_LABELS[movie.status]}
        </div>
      </div>
      
      <div className="movie-content">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-meta">
          <span className="movie-year">{movie.year}</span> • 
          <span className="movie-director">{movie.director}</span>
        </p>
        <p className="movie-genre">{movie.genre}</p>
        
        {movie.rating && (
          <div className="movie-rating">
            <span className="rating-stars" style={{ color: getRatingColor(movie.rating) }}>
              ⭐ {movie.rating}/10
            </span>
          </div>
        )}
        
        {movie.review && (
          <p className="movie-review">{movie.review.substring(0, 100)}{movie.review.length > 100 ? '...' : ''}</p>
        )}
        
        <div className="movie-footer">
          <small className="date-added">Added {formatDate(dateAdded)}</small>
          
          <div className="card-actions">
            <button
              className="btn btn-icon"
              onClick={handleFavoriteToggle}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
            
            <div className="dropdown">
              <button
                className="btn btn-icon"
                onClick={() => setShowActions(!showActions)}
                title="More actions"
              >
                ⋮
              </button>
              
              {showActions && (
                <div className="dropdown-menu">
                  <button onClick={() => handleStatusChange('want-to-watch')}>
                    Want to Watch
                  </button>
                  <button onClick={() => handleStatusChange('watching')}>
                    Watching
                  </button>
                  <button onClick={() => handleStatusChange('watched')}>
                    Watched
                  </button>
                  <hr />
                  <button onClick={handleDelete} className="delete-action">
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard