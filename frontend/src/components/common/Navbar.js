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
    const { isOpen } = this.state
    return (
      <nav className="navbar is-success">
        <div className="container">
          <div className="navbar-brand">
          {isAuthenticated() && <Link to="/" className="navbar-item">
              Home
            </Link>}
            {isAuthenticated() &&<span onClick={this.handleToggle} className={`navbar-burger ${isOpen ? 'is-active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>}
          </div>
          <div className={`navbar-menu ${isOpen ? 'is-active' : ''}`}>
            <div className="navbar-end">
            {isAuthenticated() && <Link to="/plants" className="navbar-item">
              Plants
            </Link>}
            {isAuthenticated() && <Link to="/plants/new" className="navbar-item">
              Add your plant
            </Link>}
            {isAuthenticated() && <Link to="/profile" className="navbar-item">
              My Profile
            </Link>}
          
            {isAuthenticated() && <span onClick={this.handleLogout} className="navbar-item">Logout</span>}
          </div>
        </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(Navbar)