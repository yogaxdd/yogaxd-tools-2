import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          YogaXD Tools
        </Link>
        <div className="nav-links">
          <Link to="/" className={`nav-link${location.pathname === '/' ? ' active' : ''}`}>
            Tools
          </Link>
          <Link to="/api" className={`nav-link${location.pathname === '/api' ? ' active' : ''}`}>
            API
          </Link>
        </div>
        <div className="nav-status">
          <span className="nav-status-dot"></span>
          Online
        </div>
      </div>
    </nav>
  )
}
