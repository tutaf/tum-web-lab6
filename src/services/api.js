const API_BASE_URL = 'http://localhost:8000'

class ApiService {
  constructor() {
    this.token = localStorage.getItem('token')
  }

  setToken(token) {
    this.token = token
    localStorage.setItem('token', token)
  }

  clearToken() {
    this.token = null
    localStorage.removeItem('token')
  }

  getHeaders() {
    const headers = {
      'Content-Type': 'application/json'
    }
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }
    
    return headers
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    const config = {
      headers: this.getHeaders(),
      ...options
    }

    try {
      const response = await fetch(url, config)
      
      if (response.status === 401) {
        this.clearToken()
        throw new Error('Token expired or invalid')
      }
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.detail || 'Request failed')
      }
      
      if (response.status === 204) {
        return null
      }
      
      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Auth endpoints
  async getToken(username, role = 'USER') {
    const response = await this.request('/auth/token', {
      method: 'POST',
      body: JSON.stringify({ username, role })
    })
    
    this.setToken(response.access_token)
    return response
  }

  async getRoles() {
    return await this.request('/auth/roles')
  }

  // Movie endpoints
  async getMovies(params = {}) {
    const searchParams = new URLSearchParams()
    
    if (params.skip) searchParams.append('skip', params.skip)
    if (params.limit) searchParams.append('limit', params.limit)
    if (params.status) searchParams.append('status', params.status)
    if (params.genre) searchParams.append('genre', params.genre)
    
    const query = searchParams.toString()
    const endpoint = query ? `/movies/?${query}` : '/movies/'
    
    return await this.request(endpoint)
  }

  async getMovie(id) {
    return await this.request(`/movies/${id}`)
  }

  async createMovie(movieData) {
    return await this.request('/movies/', {
      method: 'POST',
      body: JSON.stringify(movieData)
    })
  }

  async updateMovie(id, movieData) {
    return await this.request(`/movies/${id}`, {
      method: 'PUT',
      body: JSON.stringify(movieData)
    })
  }

  async deleteMovie(id) {
    return await this.request(`/movies/${id}`, {
      method: 'DELETE'
    })
  }

  async toggleFavorite(id) {
    return await this.request(`/movies/${id}/favorite`, {
      method: 'PATCH'
    })
  }

  async getStats() {
    return await this.request('/movies/stats')
  }
}

export const apiService = new ApiService()
