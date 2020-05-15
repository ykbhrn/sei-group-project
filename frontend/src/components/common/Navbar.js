import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated, logout } from '../../lib/auth'

class Navbar extends React.Component{
  state = { isOpen: false }

  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  handleLogout = () => {
    logout()
    // toast('Come back Soon')
    this.props.history.push('/')
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ isOpen: false })
    }
  }

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
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar