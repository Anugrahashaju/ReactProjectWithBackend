import api from './api'

// Course service functions
const courseService = {
  // Get all courses
  getAllCourses: async () => {
    try {
      const response = await api.get('/courses')
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Error fetching courses:', error)
      return { success: false, message: error.response?.data?.message || 'Failed to fetch courses' }
    }
  },
  
  // Get course by ID
  getCourseById: async (courseId) => {
    try {
      const response = await api.get(`/courses/${courseId}`)
      return { success: true, data: response.data }
    } catch (error) {
      console.error(`Error fetching course ${courseId}:`, error)
      return { success: false, message: error.response?.data?.message || 'Failed to fetch course details' }
    }
  },
  
  // Get courses by trainer ID
  getCoursesByTrainer: async (trainerId) => {
    try {
      const response = await api.get(`/courses/trainer/${trainerId}`)
      return { success: true, data: response.data }
    } catch (error) {
      console.error(`Error fetching trainer courses:`, error)
      return { success: false, message: error.response?.data?.message || 'Failed to fetch trainer courses' }
    }
  },
  
  // Get enrolled courses for a learner
  getEnrolledCourses: async () => {
    try {
      const response = await api.get('/courses/enrolled')
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Error fetching enrolled courses:', error)
      return { success: false, message: error.response?.data?.message || 'Failed to fetch enrolled courses' }
    }
  },
  
  // Create a new course (Admin, Trainer)
  createCourse: async (courseData) => {
    try {
      const response = await api.post('/courses', courseData)
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Error creating course:', error)
      return { success: false, message: error.response?.data?.message || 'Failed to create course' }
    }
  },
  
  // Update a course (Admin, Trainer)
  updateCourse: async (courseId, courseData) => {
    try {
      const response = await api.put(`/courses/${courseId}`, courseData)
      return { success: true, data: response.data }
    } catch (error) {
      console.error(`Error updating course ${courseId}:`, error)
      return { success: false, message: error.response?.data?.message || 'Failed to update course' }
    }
  },
  
  // Delete a course (Admin only)
  deleteCourse: async (courseId) => {
    try {
      await api.delete(`/courses/${courseId}`)
      return { success: true }
    } catch (error) {
      console.error(`Error deleting course ${courseId}:`, error)
      return { success: false, message: error.response?.data?.message || 'Failed to delete course' }
    }
  },
  
  // Enroll in a course (Learner)
  enrollInCourse: async (courseId) => {
    try {
      const response = await api.post(`/courses/${courseId}/enroll`)
      return { success: true, data: response.data }
    } catch (error) {
      console.error(`Error enrolling in course ${courseId}:`, error)
      return { success: false, message: error.response?.data?.message || 'Failed to enroll in course' }
    }
  },
  
  // Complete a module (Learner)
  completeModule: async (courseId, moduleId) => {
    try {
      const response = await api.post(`/courses/${courseId}/modules/${moduleId}/complete`)
      return { success: true, data: response.data }
    } catch (error) {
      console.error(`Error completing module:`, error)
      return { success: false, message: error.response?.data?.message || 'Failed to mark module as complete' }
    }
  },
  
  // Add course content (Trainer)
  addCourseContent: async (courseId, contentData) => {
    try {
      const response = await api.post(`/courses/${courseId}/content`, contentData)
      return { success: true, data: response.data }
    } catch (error) {
      console.error(`Error adding course content:`, error)
      return { success: false, message: error.response?.data?.message || 'Failed to add course content' }
    }
  },
  
  // Get course recommendations
  getCourseRecommendations: async () => {
    try {
      const response = await api.get('/courses/recommendations')
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Error fetching course recommendations:', error)
      return { success: false, message: error.response?.data?.message || 'Failed to fetch course recommendations' }
    }
  }
}

export default courseService