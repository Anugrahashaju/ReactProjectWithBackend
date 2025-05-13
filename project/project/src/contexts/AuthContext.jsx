import { createContext, useContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import api from '../services/api'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  // Initialize auth state from localStorage on component mount
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('accessToken')
      
      if (token) {
        try {
          // Check if token is expired
          const decoded = jwtDecode(token)
          const currentTime = Date.now() / 1000
          
          if (decoded.exp < currentTime) {
            logout()
            return
          }
          
          // Set auth headers for all future requests
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`
          
          // Get user info
          const response = await api.get('/auth/me')
          setUser(response.data)
          setIsAuthenticated(true)
        } catch (error) {
          console.error('Error initializing auth:', error)
          logout()
        }
      }
      
      setIsLoading(false)
    }
    
    initializeAuth()
  }, [])
  
  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password })
      const { accessToken } = response.data
      
      // Store token
      localStorage.setItem('accessToken', accessToken)
      
      // Set auth header
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
      
      // Decode token to get user info
      const decoded = jwtDecode(accessToken)
      setUser({
        id: decoded.sub,
        email: decoded.email,
        role: decoded.role,
        name: decoded.name
      })
      
      setIsAuthenticated(true)
      return { success: true }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, message: error.response?.data?.message || 'Login failed' }
    }
  }
  
  const register = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData)
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Registration error:', error)
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed' 
      }
    }
  }
  
  const logout = () => {
    // Clear token from storage
    localStorage.removeItem('accessToken')
    
    // Clear auth header
    delete api.defaults.headers.common['Authorization']
    
    // Reset auth state
    setUser(null)
    setIsAuthenticated(false)
  }
  
  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout
  }
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}