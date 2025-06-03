import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import './LoginForm.css'

function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    role: 'USER'
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.username.trim()) {
      setError('Username is required')
      return
    }

    setLoading(true)
    setError('')

    try {
      await login(formData.username, formData.role)
    } catch (error) {
      setError(error.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login to Movie Collection</h2>
        <p className="login-subtitle">Get a JWT token to access the API</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="VISITOR">Visitor (Read only)</option>
              <option value="USER">User (Read & Write)</option>
              <option value="ADMIN">Admin (Full access)</option>
            </select>
          </div>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <button 
            type="submit" 
            className="btn-primary login-btn"
            disabled={loading}
          >
            {loading ? 'Getting Token...' : 'Get Token & Login'}
          </button>
        </form>
        
        <div className="login-info">
          <h4>Role Permissions:</h4>
          <ul>
            <li><strong>Visitor:</strong> Can only view movies</li>
            <li><strong>User:</strong> Can view and manage movies</li>
            <li><strong>Admin:</strong> Full access including delete</li>
          </ul>
          <p className="token-warning">⚠️ Token expires in 1 minute!</p>
        </div>
      </div>
    </div>
  )
}

export default LoginForm