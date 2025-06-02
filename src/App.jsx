import { useState, useEffect } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { addSampleData } from './utils/sampleData'
import Header from './components/Header'
import MovieList from './components/MovieList'
import AddMovieForm from './components/AddMovieForm'
import FilterBar from './components/FilterBar'
import './App.css'

function App() {
  const [movies, setMovies] = useLocalStorage('movies', [])
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  const [viewMode, setViewMode] = useState('grid')
  const [filter, setFilter] = useState({ status: 'all', genre: 'all', search: '' })
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    addSampleData(setMovies)
  }, [setMovies])

  const addMovie = (movie) => {
    const newMovie = {
      ...movie,
      id: Date.now(),
      dateAdded: new Date().toISOString()
    }
    setMovies(prev => [...prev, newMovie])
    setShowAddForm(false)
  }

  const updateMovie = (id, updates) => {
    setMovies(prev => prev.map(movie => 
      movie.id === id ? { ...movie, ...updates } : movie
    ))
  }

  const deleteMovie = (id) => {
    setMovies(prev => prev.filter(movie => movie.id !== id))
  }

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  const filteredMovies = movies.filter(movie => {
    const matchesStatus = filter.status === 'all' || movie.status === filter.status
    const matchesGenre = filter.genre === 'all' || movie.genre === filter.genre
    const matchesSearch = movie.title.toLowerCase().includes(filter.search.toLowerCase())
    return matchesStatus && matchesGenre && matchesSearch
  })

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
        
        {showAddForm && (
          <AddMovieForm 
            onSubmit={addMovie}
            onCancel={() => setShowAddForm(false)}
          />
        )}
        
        <MovieList 
          movies={filteredMovies}
          viewMode={viewMode}
          onUpdateMovie={updateMovie}
          onDeleteMovie={deleteMovie}
        />
      </main>
    </div>
  )
}

export default App