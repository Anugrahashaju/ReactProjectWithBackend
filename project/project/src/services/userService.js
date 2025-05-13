import api from './api'

// User service functions
const userService = {
  // Get all users (Admin only)
  getAllUsers: async () => {
    try {
      const response = await api.get('/users')
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Error fetching users:', error)
      return { success: false, message: error.response?.data?.message || 'Failed to fetch users' }
    }
  },
  
  // Get user by ID
  getUserById: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}`)
      return { success: true, data: response.data }
    } catch (error) {
      console.error(`Error fetching user ${userId}:`, error)
      return { success: false, message: error.response?.data?.message || 'Failed to fetch user details' }
    }
  },
  
  // Get user profile (current user)
  getUserProfile: async () => {
    try {
      const response = await api.get('/users/profile')
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Error fetching user profile:', error)
      return { success: false, message: error.response?.data?.message || 'Failed to fetch user profile' }
    }
  },
  
  // Update user profile (current user)
  updateUserProfile: async (profileData) => {
    try {
      const response = await api.put('/users/profile', profileData)
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Error updating user profile:', error)
      return { success: false, message: error.response?.data?.message || 'Failed to update user profile' }
    }
  },
  
  // Update user role (Admin only)
  updateUserRole: async (userId, role) => {
    try {
      const response = await api.put(`/users/${userId}/role`, { role })
      return { success: true, data: response.data }
    } catch (error) {
      console.error(`Error updating user ${userId} role:`, error)
      return { success: false, message: error.response?.data?.message || 'Failed to update user role' }
    }
  },
  
  // Get users by department
  getUsersByDepartment: async (department) => {
    try {
      const response = await api.get(`/users/department/${department}`)
      return { success: true, data: response.data }
    } catch (error) {
      console.error(`Error fetching users in ${department}:`, error)
      return { success: false, message: error.response?.data?.message || 'Failed to fetch department users' }
    }
  },
  
  // Update user department
  assignDepartment: async (userId, department) => {
    try {
      const response = await api.put(`/users/${userId}/department`, { department })
      return { success: true, data: response.data }
    } catch (error) {
      console.error(`Error assigning department to user ${userId}:`, error)
      return { success: false, message: error.response?.data?.message || 'Failed to assign department' }
    }
  },
  
  // Get trainers
  getTrainers: async () => {
    try {
      const response = await api.get('/users/trainers')
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Error fetching trainers:', error)
      return { success: false, message: error.response?.data?.message || 'Failed to fetch trainers' }
    }
  }
}

export default userService