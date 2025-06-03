import { useState, useEffect } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { apiService } from './services/api'
import Header from './components/Header'
import MovieList from './components/MovieList'
import AddMovieForm from './components/AddMovieForm'
import FilterBar from './components/FilterBar'
import LoginForm from './components/LoginForm'
import './App.css'

function MovieApp() {
  const { isAuthenticated, loading } = useAuth()
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  const [viewMode, setViewMode] = useState('grid')
  const [filter, setFilter] = useState({ status: 'all', genre: 'all', search: '' })
  const [showAddForm, setShowAddForm] = useState(false)
  const [movies, setMovies] = useState([])
  const [loadingMovies, setLoadingMovies] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isAuthenticated) {
      loadMovies()
    }
  }, [isAuthenticated, filter])

  const loadMovies = async () => {
    setLoadingMovies(true)
    setError('')
    
    try {
      const params = {}
      if (filter.status !== 'all') params.status = filter.status
      if (filter.genre !== 'all') params.genre = filter.genre
      
      const moviesData = await apiService.getMovies(params)
      setMovies(moviesData)
    } catch (error) {
      setError(error.message)
      console.error('Failed to load movies:', error)
    } finally {
      setLoadingMovies(false)
    }
  }

  const addMovie = async (movieData) => {
    try {
      const newMovie = await apiService.createMovie(movieData)
      setMovies(prev => [...prev, newMovie])
      setShowAddForm(false)
    } catch (error) {
      alert(`Failed to add movie: ${error.message}`)
    }
  }

  const updateMovie = async (id, updates) => {
    try {
      const updatedMovie = await apiService.updateMovie(id, updates)
      setMovies(prev => prev.map(movie => 
        movie.id === id ? updatedMovie : movie
      ))
    } catch (error) {
      alert(`Failed to update movie: ${error.message}`)
    }
  }

  const deleteMovie = async (id) => {
    try {
      await apiService.deleteMovie(id)
      setMovies(prev => prev.filter(movie => movie.id !== id))
    } catch (error) {
      alert(`Failed to delete movie: ${error.message}`)
    }
  }

  const toggleFavorite = async (id) => {
    try {
      const result = await apiService.toggleFavorite(id)
      setMovies(prev => prev.map(movie => 
        movie.id === id ? { ...movie, is_favorite: result.is_favorite } : movie
      ))
    } catch (error) {
      alert(`Failed to toggle favorite: ${error.message}`)
    }
  }

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  // Filter movies by search term (client-side for now)
  const filteredMovies = movies.filter(movie => {
    if (filter.search) {
      return movie.title.toLowerCase().includes(filter.search.toLowerCase())
    }
    return true
  })

  if (loading) {
    return (
      <div className="app light">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className={`app ${theme}`}>
        <LoginForm />
      </div>
    )
  }

  return (
    <div className={`app ${theme}`}>
      <Header 
        theme={theme}
        onThemeToggle={toggleTheme}
        onAddMovie={() => setShowAddForm(true)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
      
      <main className="main-content">
        <FilterBar 
          filter={filter}
          onFilterChange={setFilter}
          movies={movies}
        />
        
        {error && (
          <div className="error-banner">
            {error}
            <button onClick={() => setError('')}>✕</button>
          </div>
        )}
        
        {showAddForm && (
          <AddMovieForm 
            onSubmit={addMovie}
            onCancel={() => setShowAddForm(false)}
          />
        )}
        
        {loadingMovies ? (
          <div className="loading-movies">
            <div className="loading-spinner"></div>
            <p>Loading movies...</p>
          </div>
        ) : (
          <MovieList 
            movies={filteredMovies}
            viewMode={viewMode}
            onUpdateMovie={updateMovie}
            onDeleteMovie={deleteMovie}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </main>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <MovieApp />
    </AuthProvider>
  )
}

export default App