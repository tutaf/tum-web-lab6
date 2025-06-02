import './Header.css'

function Header({ theme, onThemeToggle, onAddMovie, viewMode, onViewModeChange }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="header-title">
            Movie Collection Manager
          </h1>
        </div>
        
        <div className="header-right">
          <div className="view-controls">
            <button
              className={`btn btn-icon ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => onViewModeChange('grid')}
              title="Grid view"
            >
              ⊞
            </button>
            <button
              className={`btn btn-icon ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => onViewModeChange('list')}
              title="List view"
            >
              ≡
            </button>
          </div>
          
          <button 
            className="btn btn-primary"
            onClick={onAddMovie}
          >
            + Add Movie
          </button>
          
          <button
            className="btn btn-icon theme-toggle"
            onClick={onThemeToggle}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header