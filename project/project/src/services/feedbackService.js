import api from './api'

// Feedback service functions
const feedbackService = {
  // Submit feedback for a course
  submitFeedback: async (courseId, feedbackData) => {
    try {
      const response = await api.post(`/feedback/course/${courseId}`, feedbackData)
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Error submitting feedback:', error)
      return { success: false, message: error.response?.data?.message || 'Failed to submit feedback' }
    }
  },
  
  // Get feedback for a course (Trainer, Admin)
  getCourseFeedback: async (courseId) => {
    try {
      const response = await api.get(`/feedback/course/${courseId}`)
      return { success: true, data: response.data }
    } catch (error) {
      console.error(`Error fetching feedback for course ${courseId}:`, error)
      return { success: false, message: error.response?.data?.message || 'Failed to fetch course feedback' }
    }
  },
  
  // Get feedback analytics (Admin)
  getFeedbackAnalytics: async () => {
    try {
      const response = await api.get('/feedback/analytics')
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Error fetching feedback analytics:', error)
      return { success: false, message: error.response?.data?.message || 'Failed to fetch feedback analytics' }
    }
  },
  
  // Get feedback submitted by a user
  getUserFeedback: async () => {
    try {
      const response = await api.get('/feedback/user')
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Error fetching user feedback:', error)
      return { success: false, message: error.response?.data?.message || 'Failed to fetch user feedback' }
    }
  }
}

export default feedbackService