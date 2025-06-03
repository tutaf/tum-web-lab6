import { createContext, useContext, useState, useEffect } from 'react'
import { apiService } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      apiService.setToken(token)
      // Try to get user info to verify token is still valid
      checkAuthStatus()
    } else {
      setLoading(false)
    }
  }, [])

  const checkAuthStatus = async () => {
    try {
      const stats = await apiService.getStats()
      setUser(stats.user_info)
      setIsAuthenticated(true)
    } catch (error) {
      logout()
    } finally {
      setLoading(false)
    }
  }

  const login = async (username, role = 'USER') => {
    try {
      const response = await apiService.getToken(username, role)
      
      // Get user info after successful login
      const stats = await apiService.getStats()
      setUser(stats.user_info)
      setIsAuthenticated(true)
      
      return response
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    apiService.clearToken()
    setUser(null)
    setIsAuthenticated(false)
  }

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
