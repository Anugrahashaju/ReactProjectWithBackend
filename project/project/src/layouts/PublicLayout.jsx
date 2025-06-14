import { Outlet } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default PublicLayout