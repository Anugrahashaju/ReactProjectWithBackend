import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaBookOpen, FaUsers, FaFileAlt, FaChartLine, FaPlus } from 'react-icons/fa'
import courseService from '../../../services/courseService'
import feedbackService from '../../../services/feedbackService'
import { useAuth } from '../../../contexts/AuthContext'

const TrainerDashboard = () => {
  const { user } = useAuth()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [feedbackStats, setFeedbackStats] = useState(null)
  
  useEffect(() => {
    const fetchTrainerData = async () => {
      try {
        if (!user?.id) return
        
        // Get trainer courses
        const coursesResponse = await courseService.getCoursesByTrainer(user.id)
        if (coursesResponse.success) {
          setCourses(coursesResponse.data)
          
          // If courses available, set the first one as selected and fetch its feedback
          if (coursesResponse.data.length > 0) {
            setSelectedCourse(coursesResponse.data[0])
            fetchCourseFeedback(coursesResponse.data[0].id)
          }
        }
      } catch (error) {
        console.error('Error fetching trainer data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchTrainerData()
  }, [user])
  
  const fetchCourseFeedback = async (courseId) => {
    try {
      const feedbackResponse = await feedbackService.getCourseFeedback(courseId)
      if (feedbackResponse.success) {
        setFeedbackStats(feedbackResponse.data)
      }
    } catch (error) {
      console.error(`Error fetching feedback for course ${courseId}:`, error)
    }
  }
  
  const handleCourseSelect = (course) => {
    setSelectedCourse(course)
    fetchCourseFeedback(course.id)
  }
  
  // Mock data for trainer dashboard
  const mockCourses = [
    {
      id: 1,
      title: 'Introduction to Web Development',
      learners: 42,
      modules: 8,
      progress: 75,
      imageUrl: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 2,
      title: 'Advanced JavaScript Concepts',
      learners: 28,
      modules: 10,
      progress: 60,
      imageUrl: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 3,
      title: 'Responsive UI Design',
      learners: 35,
      modules: 6,
      progress: 90,
      imageUrl: 'https://images.pexels.com/photos/326501/pexels-photo-326501.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ]
  
  const recentLearners = [
    { id: 1, name: 'John Doe', course: 'Introduction to Web Development', progress: 65 },
    { id: 2, name: 'Jane Smith', course: 'Advanced JavaScript Concepts', progress: 30 },
    { id: 3, name: 'Robert Johnson', course: 'Responsive UI Design', progress: 85 },
    { id: 4, name: 'Samantha Williams', course: 'Introduction to Web Development', progress: 45 },
    { id: 5, name: 'Michael Brown', course: 'Advanced JavaScript Concepts', progress: 70 }
  ]
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Trainer Dashboard</h1>
          <p className="text-gray-600">Manage your courses and track learner progress</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Link 
            to="/trainer/create-course" 
            className="btn-primary flex items-center"
          >
            <FaPlus className="mr-2" />
            Create New Course
          </Link>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Active Courses</p>
              <p className="text-2xl font-semibold">{mockCourses.length}</p>
            </div>
            <div className="rounded-full bg-primary-100 p-3">
              <FaBookOpen className="h-6 w-6 text-primary-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Total Learners</p>
              <p className="text-2xl font-semibold">105</p>
            </div>
            <div className="rounded-full bg-secondary-100 p-3">
              <FaUsers className="h-6 w-6 text-secondary-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Course Content</p>
              <p className="text-2xl font-semibold">24</p>
            </div>
            <div className="rounded-full bg-accent-100 p-3">
              <FaFileAlt className="h-6 w-6 text-accent-600" />
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-500">Modules</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Average Completion</p>
              <p className="text-2xl font-semibold">75%</p>
            </div>
            <div className="rounded-full bg-success-100 p-3">
              <FaChartLine className="h-6 w-6 text-success-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-success-600 h-2.5 rounded-full" 
                style={{ width: '75%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Courses Section */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Your Courses</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Learners
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Modules
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockCourses.length > 0 ? (
                mockCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 rounded-md overflow-hidden">
                          <img 
                            src={course.imageUrl} 
                            alt={course.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{course.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{course.learners}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{course.modules}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2 max-w-[100px]">
                          <div 
                            className="bg-primary-600 h-2.5 rounded-full" 
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-900">{course.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link
                        to={`/trainer/courses/${course.id}`}
                        className="text-primary-600 hover:text-primary-900 mr-3"
                      >
                        View
                      </Link>
                      <Link
                        to={`/trainer/courses/${course.id}/edit`}
                        className="text-secondary-600 hover:text-secondary-900 mr-3"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    You haven't created any courses yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {courses.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <Link to="/trainer/courses" className="text-primary-600 hover:text-primary-900 text-sm font-medium">
              View all courses
            </Link>
          </div>
        )}
      </div>
      
      {/* Recent Learners Progress */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Learner Progress</h2>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Learners</h3>
              <Link to="/trainer/learner-progress" className="text-primary-600 hover:text-primary-900 text-sm font-medium">
                View all
              </Link>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentLearners.map((learner) => (
                  <tr key={learner.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                          {learner.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{learner.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{learner.course}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2 max-w-[100px]">
                          <div 
                            className={`h-2.5 rounded-full ${
                              learner.progress < 30 ? 'bg-error-500' :
                              learner.progress < 70 ? 'bg-warning-500' :
                              'bg-success-500'
                            }`}
                            style={{ width: `${learner.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-900">{learner.progress}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrainerDashboard