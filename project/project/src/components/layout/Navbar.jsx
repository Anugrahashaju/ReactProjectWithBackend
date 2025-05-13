import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { FaBook, FaSignInAlt, FaUserPlus, FaBars, FaTimes } from 'react-icons/fa'

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const handleLogout = () => {
    logout()
    navigate('/')
  }
  
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }
  
  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FaBook className="text-primary-600 text-2xl" />
            <span className="text-xl font-bold text-primary-700">LearnSphere</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors">Home</Link>
            <Link to="/features" className="text-gray-700 hover:text-primary-600 transition-colors">Features</Link>
            <Link to="/about" className="text-gray-700 hover:text-primary-600 transition-colors">About</Link>
            <Link to="/faq" className="text-gray-700 hover:text-primary-600 transition-colors">FAQ</Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary-600 transition-colors">Contact</Link>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="btn-primary">Dashboard</Link>
                <button 
                  onClick={handleLogout} 
                  className="text-gray-700 hover:text-primary-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors">
                  <FaSignInAlt />
                  <span>Login</span>
                </Link>
                <Link to="/register" className="btn-primary flex items-center space-x-1">
                  <FaUserPlus />
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700 hover:text-primary-600 focus:outline-none">
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors" onClick={toggleMenu}>Home</Link>
              <Link to="/features" className="text-gray-700 hover:text-primary-600 transition-colors" onClick={toggleMenu}>Features</Link>
              <Link to="/about" className="text-gray-700 hover:text-primary-600 transition-colors" onClick={toggleMenu}>About</Link>
              <Link to="/faq" className="text-gray-700 hover:text-primary-600 transition-colors" onClick={toggleMenu}>FAQ</Link>
              <Link to="/contact" className="text-gray-700 hover:text-primary-600 transition-colors" onClick={toggleMenu}>Contact</Link>
              
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="btn-primary text-center" onClick={toggleMenu}>Dashboard</Link>
                  <button 
                    onClick={() => {
                      handleLogout()
                      toggleMenu()
                    }} 
                    className="text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-primary-600 transition-colors" onClick={toggleMenu}>Login</Link>
                  <Link to="/register" className="btn-primary text-center" onClick={toggleMenu}>Register</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar