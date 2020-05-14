import React from 'react'
import { Link } from 'react-router-dom'

class Navbar extends React.Component{

  render() {
    return(
      <nav className="navbar is-dark">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              Home
            </Link>
            <Link to="/cars" className="navbar-item">
              Plants
            </Link>
            </div>
          </div>
          </nav>
    )
  }
}

export default Navbar