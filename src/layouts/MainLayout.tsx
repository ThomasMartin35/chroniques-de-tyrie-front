// React Router
import { Outlet } from 'react-router-dom'
// Components
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
// Styles
import './MainLayout.css'

function MainLayout() {
  return (
    <div className="layout">
      <Navbar />

      <div className="layout__content">
        <Outlet />
      </div>

      <Footer />
    </div>
  )
}

export default MainLayout