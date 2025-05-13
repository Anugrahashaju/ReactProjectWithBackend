import api from './api'

// Chatbot service functions
const chatbotService = {
  // Get course suggestions from AI
  getCourseSuggestions: async (query) => {
    try {
      const response = await api.post('/chatbot/suggestions', { query })
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Error getting course suggestions:', error)
      return { success: false, message: error.response?.data?.message || 'Failed to get course suggestions' }
    }
  },
  
  // Ask chatbot a question
  askQuestion: async (question) => {
    try {
      const response = await api.post('/chatbot/ask', { question })
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Error asking chatbot:', error)
      return { success: false, message: error.response?.data?.message || 'Failed to get answer from chatbot' }
    }
  }
}

export default chatbotService