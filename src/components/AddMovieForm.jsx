import { useState } from 'react'
import './AddMovieForm.css'

const GENRES = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary',
  'Drama', 'Family', 'Fantasy', 'Horror', 'Mystery', 'Romance',
  'Sci-Fi', 'Thriller', 'War', 'Western'
]

function AddMovieForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    director: '',
    year: '',
    genre: '',
    rating: '',
    status: 'want-to-watch',
    review: '',
    isFavorite: false
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    
    if (!formData.director.trim()) {
      newErrors.director = 'Director is required'
    }
    
    if (!formData.year) {
      newErrors.year = 'Year is required'
    } else if (formData.year < 1900 || formData.year > new Date().getFullYear() + 5) {
      newErrors.year = 'Please enter a valid year'
    }
    
    if (!formData.genre) {
      newErrors.genre = 'Genre is required'
    }
    
    if (formData.rating && (formData.rating < 1 || formData.rating > 10)) {
      newErrors.rating = 'Rating must be between 1-10'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSubmit({
        ...formData,
        year: parseInt(formData.year),
        rating: formData.rating ? parseFloat(formData.rating) : null
      })
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add New Movie</h2>
          <button 
            className="btn btn-icon close-btn"
            onClick={onCancel}
            type="button"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="add-movie-form">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="title">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className={`form-input ${errors.title ? 'error' : ''}`}
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter movie title"
              />
              {errors.title && <span className="error-message">{errors.title}</span>}
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="director">
                Director *
              </label>
              <input
                type="text"
                id="director"
                name="director"
                className={`form-input ${errors.director ? 'error' : ''}`}
                value={formData.director}
                onChange={handleChange}
                placeholder="Enter director name"
              />
              {errors.director && <span className="error-message">{errors.director}</span>}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="year">
                Year *
              </label>
              <input
                type="number"
                id="year"
                name="year"
                className={`form-input ${errors.year ? 'error' : ''}`}
                value={formData.year}
                onChange={handleChange}
                placeholder="2024"
                min="1900"
                max={new Date().getFullYear() + 5}
              />
              {errors.year && <span className="error-message">{errors.year}</span>}
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="genre">
                Genre *
              </label>
              <select
                id="genre"
                name="genre"
                className={`form-select ${errors.genre ? 'error' : ''}`}
                value={formData.genre}
                onChange={handleChange}
              >
                <option value="">Select genre</option>
                {GENRES.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
              {errors.genre && <span className="error-message">{errors.genre}</span>}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="rating">
                Rating (1-10)
              </label>
              <input
                type="number"
                id="rating"
                name="rating"
                className={`form-input ${errors.rating ? 'error' : ''}`}
                value={formData.rating}
                onChange={handleChange}
                placeholder="8.5"
                min="1"
                max="10"
                step="0.1"
              />
              {errors.rating && <span className="error-message">{errors.rating}</span>}
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="status">
                Status
              </label>
              <select
                id="status"
                name="status"
                className="form-select"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="want-to-watch">Want to Watch</option>
                <option value="watching">Currently Watching</option>
                <option value="watched">Watched</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="review">
              Review/Notes
            </label>
            <textarea
              id="review"
              name="review"
              className="form-textarea"
              value={formData.review}
              onChange={handleChange}
              placeholder="Your thoughts about this movie..."
              rows="3"
            />
          </div>
          
          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isFavorite"
                checked={formData.isFavorite}
                onChange={handleChange}
                className="checkbox-input"
              />
              <span className="checkbox-custom"></span>
              Mark as favorite
            </label>
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
            >
              Add Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddMovieForm