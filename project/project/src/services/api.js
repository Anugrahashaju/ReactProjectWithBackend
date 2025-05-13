import axios from 'axios'

// Create axios instance with base URL for the API Gateway
const api = axios.create({
  baseURL: import.meta.env.VITE_API_GATEWAY_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    
    // If the error is not related to authentication, reject it
    if (!error.response || error.response.status !== 401) {
      return Promise.reject(error)
    }
    
    // Check if we already tried to refresh the token
    if (originalRequest._retry) {
      // If we've already tried to refresh the token, logout the user
      localStorage.removeItem('accessToken')
      window.location.href = '/login'
      return Promise.reject(error)
    }
    
    // Set a flag that we've tried to refresh the token
    originalRequest._retry = true
    
    try {
      // Try to refresh the token
      const refreshToken = localStorage.getItem('refreshToken')
      if (!refreshToken) {
        throw new Error('No refresh token available')
      }
      
      const response = await axios.post(`${import.meta.env.VITE_AUTH_SERVICE_URL}/auth/refresh`, {
        refreshToken
      })
      
      const { accessToken } = response.data
      
      // Store the new token
      localStorage.setItem('accessToken', accessToken)
      
      // Update the authorization header
      originalRequest.headers.Authorization = `Bearer ${accessToken}`
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
      
      // Retry the original request
      return api(originalRequest)
    } catch (refreshError) {
      // If refreshing the token fails, log the user out
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      window.location.href = '/login'
      return Promise.reject(refreshError)
    }
  }
)

export default api