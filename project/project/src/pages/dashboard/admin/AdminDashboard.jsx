import { useState, useEffect } from 'react'
import { FaUsers, FaBookOpen, FaChalkboardTeacher, FaUserGraduate, FaChartLine } from 'react-icons/fa'
import userService from '../../../services/userService'
import courseService from '../../../services/courseService'
import feedbackService from '../../../services/feedbackService'

// Chart component
const Chart = ({ data }) => {
  // This is a placeholder for a chart component
  // In a real implementation, you would use a library like recharts
  return (
    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
      <p className="text-gray-500">Chart Placeholder</p>
    </div>
  )
}

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    userCount: 0,
    courseCount: 0,
    trainerCount: 0,
    completionRate: 0
  })
  
  const [recentUsers, setRecentUsers] = useState([])
  const [topCourses, setTopCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Get stats
        const usersResponse = await userService.getAllUsers()
        if (usersResponse.success) {
          const users = usersResponse.data
          
          // Calculate user stats
          const trainers = users.filter(user => user.role === 'ROLE_TRAINER')
          
          setStats(prev => ({
            ...prev,
            userCount: users.length,
            trainerCount: trainers.length,
          }))
          
          // Get recent users
          setRecentUsers(users.slice(0, 5))
        }
        
        // Get courses
        const coursesResponse = await courseService.getAllCourses()
        if (coursesResponse.success) {
          const courses = coursesResponse.data
          
          setStats(prev => ({
            ...prev,
            courseCount: courses.length,
          }))
          
          // Get top courses
          setTopCourses(courses.slice(0, 5))
        }
        
        // Get feedback analytics for completion rate
        const feedbackResponse = await feedbackService.getFeedbackAnalytics()
        if (feedbackResponse.success) {
          setStats(prev => ({
            ...prev,
            completionRate: feedbackResponse.data.completionRate || 0,
          }))
        }
        
      } catch (err) {
        console.error('Error fetching dashboard data:', err)
        setError('Failed to load dashboard data. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    
    fetchDashboardData()
  }, [])
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    )
  }
  
  // Mock data - in a real implementation, this would come from the API
  const departments = [
    { name: 'IT', count: 45, completion: 78 },
    { name: 'HR', count: 32, completion: 85 },
    { name: 'Finance', count: 28, completion: 62 },
    { name: 'Marketing', count: 36, completion: 70 },
    { name: 'Operations', count: 50, completion: 75 }
  ]
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
          <div className="rounded-full bg-primary-100 p-3 mr-4">
            <FaUsers className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Users</p>
            <p className="text-2xl font-semibold">{stats.userCount}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
          <div className="rounded-full bg-secondary-100 p-3 mr-4">
            <FaBookOpen className="h-6 w-6 text-secondary-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Courses</p>
            <p className="text-2xl font-semibold">{stats.courseCount}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
          <div className="rounded-full bg-accent-100 p-3 mr-4">
            <FaChalkboardTeacher className="h-6 w-6 text-accent-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Trainers</p>
            <p className="text-2xl font-semibold">{stats.trainerCount}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
          <div className="rounded-full bg-success-100 p-3 mr-4">
            <FaChartLine className="h-6 w-6 text-success-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Completion Rate</p>
            <p className="text-2xl font-semibold">{stats.completionRate}%</p>
          </div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Course Enrollments</h2>
          <Chart data={[]} />
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Department Performance</h2>
          <Chart data={[]} />
        </div>
      </div>
      
      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Recent Users</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentUsers.length > 0 ? (
                  recentUsers.map((user, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {user.role.replace('ROLE_', '')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.department || 'N/A'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Department Overview */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Department Overview</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Users
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Completion
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {departments.map((department, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{department.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{department.count}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-primary-600 h-2.5 rounded-full" 
                            style={{ width: `${department.completion}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm text-gray-900">{department.completion}%</span>
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

export default AdminDashboard