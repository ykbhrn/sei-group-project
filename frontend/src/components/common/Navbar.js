import React from 'react'
import { Link } from 'react-router-dom'

class Navbar extends React.Component{

  render() {
    return (
      <nav className="navbar is-success">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              Home
            </Link>
            <Link to="/plants" className="navbar-item">
              Plants
            </Link>
            <Link to="/register" className="navbar-item">
              Register
            </Link>
            <Link to="/login" className="navbar-item">
              Login
            </Link>
            <Link to="/plants/new" className="navbar-item">
              Add your plant
            </Link>
            <Link to="/profile" className="navbar-item">
              My Profile
            </Link>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar