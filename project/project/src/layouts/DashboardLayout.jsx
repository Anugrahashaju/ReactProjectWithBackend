import { useState } from 'react'
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { 
  FaBook, 
  FaHome, 
  FaUsers, 
  FaCog, 
  FaSignOutAlt, 
  FaBell, 
  FaUser, 
  FaChalkboardTeacher, 
  FaLaptopCode, 
  FaUsersCog, 
  FaChartLine,
  FaComments
} from 'react-icons/fa'

const DashboardLayout = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  
  if (!user) {
    return <div>Loading...</div>
  }
  
  const handleLogout = () => {
    logout()
    navigate('/login')
  }
  
  // Generate navigation items based on user role
  const getNavItems = () => {
    const baseItems = [
      {
        title: 'Dashboard',
        icon: <FaHome />,
        path: '/dashboard'
      }
    ]
    
    // Role-specific items
    const roleItems = {
      'ROLE_ADMIN': [
        {
          title: 'Manage Users',
          icon: <FaUsers />,
          path: '/admin/users'
        },
        {
          title: 'Role Management',
          icon: <FaUsersCog />,
          path: '/admin/roles'
        },
        {
          title: 'Courses',
          icon: <FaBook />,
          path: '/admin/courses'
        },
        {
          title: 'Analytics',
          icon: <FaChartLine />,
          path: '/admin/analytics'
        },
        {
          title: 'System Settings',
          icon: <FaCog />,
          path: '/admin/settings'
        }
      ],
      'ROLE_TRAINER': [
        {
          title: 'My Courses',
          icon: <FaBook />,
          path: '/trainer/courses'
        },
        {
          title: 'Create Course',
          icon: <FaChalkboardTeacher />,
          path: '/trainer/create-course'
        },
        {
          title: 'Learner Progress',
          icon: <FaChartLine />,
          path: '/trainer/learner-progress'
        },
        {
          title: 'Feedback',
          icon: <FaComments />,
          path: '/trainer/feedback'
        }
      ],
      'ROLE_EMPLOYEE': [
        {
          title: 'My Courses',
          icon: <FaBook />,
          path: '/employee/courses'
        },
        {
          title: 'Available Courses',
          icon: <FaChalkboardTeacher />,
          path: '/employee/available-courses'
        },
        {
          title: 'My Progress',
          icon: <FaChartLine />,
          path: '/employee/progress'
        },
        {
          title: 'Certificates',
          icon: <FaChalkboardTeacher />,
          path: '/employee/certificates'
        },
        {
          title: 'AI Assistant',
          icon: <FaLaptopCode />,
          path: '/employee/ai-assistant'
        }
      ],
      'ROLE_HR': [
        {
          title: 'Team Overview',
          icon: <FaUsers />,
          path: '/hr/team'
        },
        {
          title: 'Learning Paths',
          icon: <FaChalkboardTeacher />,
          path: '/hr/learning-paths'
        },
        {
          title: 'Analytics',
          icon: <FaChartLine />,
          path: '/hr/analytics'
        }
      ],
      'ROLE_IT': [
        {
          title: 'Team Overview',
          icon: <FaUsers />,
          path: '/it/team'
        },
        {
          title: 'System Integration',
          icon: <FaLaptopCode />,
          path: '/it/integration'
        },
        {
          title: 'Support Requests',
          icon: <FaComments />,
          path: '/it/support'
        }
      ],
      'ROLE_LND': [
        {
          title: 'Learning Tracks',
          icon: <FaChalkboardTeacher />,
          path: '/lnd/tracks'
        },
        {
          title: 'Manage Content',
          icon: <FaBook />,
          path: '/lnd/content'
        },
        {
          title: 'Performance Metrics',
          icon: <FaChartLine />,
          path: '/lnd/metrics'
        }
      ]
    }
    
    const items = [...baseItems]
    if (user.role && roleItems[user.role]) {
      items.push(...roleItems[user.role])
    }
    
    return items
  }
  
  const navItems = getNavItems()
  
  const getRoleName = (role) => {
    const roleMap = {
      'ROLE_ADMIN': 'Admin',
      'ROLE_TRAINER': 'Trainer',
      'ROLE_EMPLOYEE': 'Employee',
      'ROLE_HR': 'HR Manager',
      'ROLE_IT': 'IT Manager',
      'ROLE_LND': 'L&D Manager'
    }
    
    return roleMap[role] || 'User'
  }
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div 
        className={`bg-white shadow-lg transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="p-4 flex items-center justify-between border-b">
          <div className="flex items-center space-x-2">
            <FaBook className="text-primary-600 text-2xl" />
            {sidebarOpen && <span className="text-lg font-bold text-primary-700">LearnSphere</span>}
          </div>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-500 hover:text-primary-600 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {sidebarOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              )}
            </svg>
          </button>
        </div>
        
        <div className="p-4">
          <nav className="space-y-2">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {sidebarOpen && <span>{item.title}</span>}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 py-3 flex justify-between items-center">
            <div>
              <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
              <p className="text-sm text-gray-600">{getRoleName(user.role)}</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-500 hover:text-primary-600 transition-colors">
                <FaBell size={20} />
                <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <button className="flex items-center space-x-2 focus:outline-none">
                    <div className="h-9 w-9 rounded-full bg-primary-600 flex items-center justify-center text-white">
                      {user.name ? user.name.charAt(0).toUpperCase() : <FaUser />}
                    </div>
                    {sidebarOpen && (
                      <div className="hidden md:block">
                        <div className="text-sm font-medium text-gray-800">{user.name || 'User'}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                    )}
                  </button>
                </div>
                
                <button 
                  onClick={handleLogout}
                  className="flex items-center justify-center h-9 w-9 rounded-full text-gray-500 hover:bg-gray-100 hover:text-red-500 transition-colors"
                >
                  <FaSignOutAlt />
                </button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Content */}
        <main className="flex-1 overflow-auto p-4 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout