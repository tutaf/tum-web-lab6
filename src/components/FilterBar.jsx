import { useState, useEffect } from 'react'
import './FilterBar.css'


function FilterBar({ filter, onFilterChange, movies }) {
  const [genres, setGenres] = useState([])

  useEffect(() => {
    const uniqueGenres = [...new Set(movies.map(movie => movie.genre).filter(Boolean))]
    setGenres(uniqueGenres.sort())
  }, [movies])

  const handleSearchChange = (e) => {
    onFilterChange(prev => ({ ...prev, search: e.target.value }))
  }

  const handleStatusChange = (e) => {
    onFilterChange(prev => ({ ...prev, status: e.target.value }))
  }

  const handleGenreChange = (e) => {
    onFilterChange(prev => ({ ...prev, genre: e.target.value }))
  }

  const clearFilters = () => {
    onFilterChange({ status: 'all', genre: 'all', search: '' })
  }

  const hasActiveFilters = filter.status !== 'all' || filter.genre !== 'all' || filter.search !== ''

  return (
    <div className="filter-bar">
      <div className="filter-controls">
        <div className="search-box">
          <input
            type="text"
            className="form-input search-input"
            placeholder="Search movies..."
            value={filter.search}
            onChange={handleSearchChange}
          />
          <span className="search-icon">🔍</span>
        </div>
        
        <select
          className="form-select"
          value={filter.status}
          onChange={handleStatusChange}
        >
          <option value="all">All Status</option>
          <option value="want-to-watch">Want to Watch</option>
          <option value="watching">Currently Watching</option>
          <option value="watched">Watched</option>
        </select>
        
        <select
          className="form-select"
          value={filter.genre}
          onChange={handleGenreChange}
        >
          <option value="all">All Genres</option>
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
        
        {hasActiveFilters && (
          <button
            className="btn btn-secondary clear-filters"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        )}
      </div>
      
      <div className="filter-info">
        {movies.length > 0 && (
          <span className="results-count">
            {movies.filter(movie => {
              const matchesStatus = filter.status === 'all' || movie.status === filter.status
              const matchesGenre = filter.genre === 'all' || movie.genre === filter.genre
              const matchesSearch = movie.title.toLowerCase().includes(filter.search.toLowerCase())
              return matchesStatus && matchesGenre && matchesSearch
            }).length} of {movies.length} movies
          </span>
        )}
      </div>
    </div>
  )
}

export default FilterBar