import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'

// Layout components
import PublicLayout from './layouts/PublicLayout'
import DashboardLayout from './layouts/DashboardLayout'

// Public pages
import Home from './pages/public/Home'
import Features from './pages/public/Features'
import About from './pages/public/About'
import Contact from './pages/public/Contact'
import Faq from './pages/public/Faq'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

// Dashboard pages
import AdminDashboard from './pages/dashboard/admin/AdminDashboard'
import TrainerDashboard from './pages/dashboard/trainer/TrainerDashboard'
import LearnerDashboard from './pages/dashboard/learner/LearnerDashboard'
import HrDashboard from './pages/dashboard/hr/HrDashboard'
import ItDashboard from './pages/dashboard/it/ItDashboard'
import LndDashboard from './pages/dashboard/lnd/LndDashboard'

// Protected route component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, isLoading } = useAuth()
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
    </div>
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />
  }
  
  return children
}

function App() {
  const { user } = useAuth()
  
  // Logic to determine home dashboard based on user role
  const getDashboardByRole = () => {
    if (!user) return '/login'
    
    const roleMap = {
      'ROLE_ADMIN': '/admin/dashboard',
      'ROLE_TRAINER': '/trainer/dashboard',
      'ROLE_EMPLOYEE': '/employee/dashboard',
      'ROLE_HR': '/hr/dashboard',
      'ROLE_IT': '/it/dashboard',
      'ROLE_LND': '/lnd/dashboard'
    }
    
    return roleMap[user.role] || '/employee/dashboard'
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="features" element={<Features />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="faq" element={<Faq />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      
      {/* Dashboard routes */}
      <Route path="/" element={<DashboardLayout />}>
        {/* Admin routes */}
        <Route path="admin/dashboard" element={
          <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        
        {/* Trainer routes */}
        <Route path="trainer/dashboard" element={
          <ProtectedRoute allowedRoles={['ROLE_TRAINER']}>
            <TrainerDashboard />
          </ProtectedRoute>
        } />
        
        {/* Learner routes */}
        <Route path="employee/dashboard" element={
          <ProtectedRoute allowedRoles={['ROLE_EMPLOYEE']}>
            <LearnerDashboard />
          </ProtectedRoute>
        } />
        
        {/* HR routes */}
        <Route path="hr/dashboard" element={
          <ProtectedRoute allowedRoles={['ROLE_HR']}>
            <HrDashboard />
          </ProtectedRoute>
        } />
        
        {/* IT routes */}
        <Route path="it/dashboard" element={
          <ProtectedRoute allowedRoles={['ROLE_IT']}>
            <ItDashboard />
          </ProtectedRoute>
        } />
        
        {/* L&D routes */}
        <Route path="lnd/dashboard" element={
          <ProtectedRoute allowedRoles={['ROLE_LND']}>
            <LndDashboard />
          </ProtectedRoute>
        } />
      </Route>
      
      {/* Redirect to dashboard based on role when accessing /dashboard */}
      <Route path="/dashboard" element={<Navigate to={getDashboardByRole()} />} />
      
      {/* Catch-all route - redirect to home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App