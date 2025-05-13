import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaBookOpen, FaChartLine, FaCertificate, FaClock, FaPlay, FaRobot } from 'react-icons/fa'
import courseService from '../../../services/courseService'
import chatbotService from '../../../services/chatbotService'
import { useAuth } from '../../../contexts/AuthContext'

const LearnerDashboard = () => {
  const { user } = useAuth()
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [recommendations, setRecommendations] = useState([])
  const [chatbotInput, setChatbotInput] = useState('')
  const [chatMessages, setChatMessages] = useState([
    { 
      type: 'bot', 
      message: 'Hello! I can help you find courses based on your interests and current skills. What would you like to learn about?' 
    }
  ])
  const [loading, setLoading] = useState({
    courses: true,
    recommendations: true
  })
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get enrolled courses
        const coursesResponse = await courseService.getEnrolledCourses()
        if (coursesResponse.success) {
          setEnrolledCourses(coursesResponse.data)
        }
        setLoading(prev => ({ ...prev, courses: false }))
        
        // Get course recommendations
        const recommendationsResponse = await courseService.getCourseRecommendations()
        if (recommendationsResponse.success) {
          setRecommendations(recommendationsResponse.data)
        }
        setLoading(prev => ({ ...prev, recommendations: false }))
      } catch (error) {
        console.error('Error fetching learner data:', error)
        setLoading({
          courses: false,
          recommendations: false
        })
      }
    }
    
    fetchData()
  }, [])
  
  const handleChatbotSubmit = async (e) => {
    e.preventDefault()
    
    if (!chatbotInput.trim()) return
    
    // Add user message to chat
    setChatMessages(prev => [
      ...prev, 
      { type: 'user', message: chatbotInput }
    ])
    
    const userQuery = chatbotInput
    setChatbotInput('')
    
    try {
      // Add a loading message
      setChatMessages(prev => [
        ...prev, 
        { type: 'bot', message: '...', isLoading: true }
      ])
      
      // Get suggestions from the AI
      const response = await chatbotService.getCourseSuggestions(userQuery)
      
      // Remove loading message
      setChatMessages(prev => prev.filter(msg => !msg.isLoading))
      
      if (response.success) {
        setChatMessages(prev => [
          ...prev, 
          { type: 'bot', message: response.data.message }
        ])
      } else {
        setChatMessages(prev => [
          ...prev, 
          { type: 'bot', message: "I'm sorry, I couldn't generate suggestions right now. Please try again later." }
        ])
      }
    } catch (error) {
      console.error('Error getting chatbot suggestions:', error)
      
      // Remove loading message
      setChatMessages(prev => prev.filter(msg => !msg.isLoading))
      
      setChatMessages(prev => [
        ...prev, 
        { type: 'bot', message: "I'm sorry, there was an error processing your request. Please try again later." }
      ])
    }
  }
  
  // Mock data for progress - in a real app, this would come from the API
  const progress = {
    completedCourses: 3,
    totalEnrolled: 5,
    totalHours: 12,
    certificates: 2
  }
  
  // Mock data for in-progress courses - in a real app, this would come from the API
  const mockEnrolledCourses = [
    {
      id: 1,
      title: 'Introduction to JavaScript',
      description: 'Learn the basics of JavaScript programming',
      progress: 65,
      imageUrl: 'https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg?auto=compress&cs=tinysrgb&w=600',
      nextLesson: 'Functions and Scope'
    },
    {
      id: 2,
      title: 'Advanced React Patterns',
      description: 'Master advanced React techniques',
      progress: 30,
      imageUrl: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=600',
      nextLesson: 'Render Props Pattern'
    },
    {
      id: 3,
      title: 'Data Science Fundamentals',
      description: 'Introduction to data analysis and visualization',
      progress: 85,
      imageUrl: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=600',
      nextLesson: 'Statistical Analysis'
    }
  ]
  
  // Mock course recommendations
  const mockRecommendations = [
    {
      id: 4,
      title: 'Cloud Computing Essentials',
      description: 'Learn the fundamentals of cloud infrastructure',
      imageUrl: 'https://images.pexels.com/photos/2653362/pexels-photo-2653362.jpeg?auto=compress&cs=tinysrgb&w=600',
      level: 'Beginner',
      duration: '6 hours'
    },
    {
      id: 5,
      title: 'Machine Learning for Beginners',
      description: 'Introduction to ML algorithms and applications',
      imageUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
      level: 'Intermediate',
      duration: '10 hours'
    }
  ]
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome back, {user.name || 'Learner'}!</h1>
          <p className="text-gray-600">Continue your learning journey</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Link to="/employee/available-courses" className="btn-primary">
            Explore Courses
          </Link>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Completed Courses</p>
              <p className="text-2xl font-semibold">{progress.completedCourses}/{progress.totalEnrolled}</p>
            </div>
            <div className="rounded-full bg-primary-100 p-3">
              <FaBookOpen className="h-6 w-6 text-primary-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-primary-600 h-2.5 rounded-full" 
                style={{ width: `${(progress.completedCourses / progress.totalEnrolled) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Hours Spent</p>
              <p className="text-2xl font-semibold">{progress.totalHours}</p>
            </div>
            <div className="rounded-full bg-secondary-100 p-3">
              <FaClock className="h-6 w-6 text-secondary-600" />
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-500">Last 30 days</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Overall Progress</p>
              <p className="text-2xl font-semibold">70%</p>
            </div>
            <div className="rounded-full bg-accent-100 p-3">
              <FaChartLine className="h-6 w-6 text-accent-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-accent-600 h-2.5 rounded-full" 
                style={{ width: '70%' }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Certificates</p>
              <p className="text-2xl font-semibold">{progress.certificates}</p>
            </div>
            <div className="rounded-full bg-success-100 p-3">
              <FaCertificate className="h-6 w-6 text-success-600" />
            </div>
          </div>
          <Link to="/employee/certificates" className="mt-4 inline-block text-sm text-primary-600 hover:underline">
            View all certificates
          </Link>
        </div>
      </div>
      
      {/* In Progress Courses */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Continue Learning</h2>
        
        {loading.courses ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
                <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                <div className="h-4 bg-gray-200 rounded-full w-full mb-2"></div>
                <div className="h-10 bg-gray-200 rounded w-1/3 mt-4"></div>
              </div>
            ))}
          </div>
        ) : enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockEnrolledCourses.map(course => (
              <div key={course.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="h-40 overflow-hidden">
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-700">{course.progress}% complete</span>
                      <span className="text-sm text-gray-700">{course.progress}/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-primary-600 h-2.5 rounded-full" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">
                    <span className="font-semibold">Next:</span> {course.nextLesson}
                  </p>
                  
                  <Link
                    to={`/employee/courses/${course.id}`}
                    className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                  >
                    <FaPlay className="mr-2" />
                    Continue
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-gray-600 mb-4">You haven't enrolled in any courses yet.</p>
            <Link
              to="/employee/available-courses"
              className="btn-primary"
            >
              Browse Available Courses
            </Link>
          </div>
        )}
      </div>
      
      {/* Course Recommendations and AI Assistant */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course Recommendations */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
          
          {loading.recommendations ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[1, 2].map(i => (
                <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
                  <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : recommendations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {mockRecommendations.map(course => (
                <div key={course.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="h-40 overflow-hidden">
                    <img
                      src={course.imageUrl}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                    
                    <div className="flex justify-between mb-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {course.level}
                      </span>
                      <span className="inline-flex items-center text-xs text-gray-500">
                        <FaClock className="mr-1" /> {course.duration}
                      </span>
                    </div>
                    
                    <Link
                      to={`/employee/available-courses/${course.id}`}
                      className="inline-flex items-center px-4 py-2 bg-white border border-primary-600 text-primary-600 rounded-md hover:bg-primary-50 transition-colors"
                    >
                      View Course
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <p className="text-gray-600">No course recommendations available yet.</p>
            </div>
          )}
        </div>
        
        {/* AI Assistant */}
        <div>
          <h2 className="text-xl font-semibold mb-4">AI Learning Assistant</h2>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden h-[500px] flex flex-col">
            <div className="p-4 bg-primary-600 text-white">
              <div className="flex items-center">
                <FaRobot className="mr-2" />
                <h3 className="font-semibold">Learning Assistant</h3>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.type === 'user' 
                        ? 'bg-primary-100 text-primary-800' 
                        : 'bg-gray-100 text-gray-800'
                    } ${msg.isLoading ? 'animate-pulse' : ''}`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t">
              <form onSubmit={handleChatbotSubmit} className="flex">
                <input
                  type="text"
                  value={chatbotInput}
                  onChange={(e) => setChatbotInput(e.target.value)}
                  placeholder="Ask about course recommendations..."
                  className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="bg-primary-600 text-white px-4 py-2 rounded-r-md hover:bg-primary-700 transition-colors"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LearnerDashboard