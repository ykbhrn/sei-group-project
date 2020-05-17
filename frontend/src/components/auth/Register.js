import React from 'react'
import { registerUser } from '../../lib/api'
import { Redirect } from 'react-router-dom'

class Register extends React.Component {
  state = {
    formData: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    },
    redirect: false,
    errors: {}
  }

  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    const errors = { ...this.state.errors, [event.target.name]: '' }
    this.setState({ formData, errors })
  }

  handleSubmit = async event => {
    event.preventDefault()

    try {
      await registerUser(this.state.formData)
      this.setRedirect()
      // this.props.history.push('/login')
    } catch (err) {
      // this.setState({ errors: err.response.data.errors })
    }
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/login' />
    }
  }

  handleClick = () => {
    this.props.sendData(false)
  }

  render() {
    const { formData, errors }  = this.state
    console.log(this.state)
    return (
      <section className="section">
        {this.renderRedirect()}
        <div className="container">
          <div className="columns">
            <form onSubmit={this.handleSubmit} className="column">
            <h1 className="has-text-centered">Sign Up Here</h1><br></br>
              <div className="field">
                {/* <label className="label">Name</label> */}
                <div className="control">
                  <input 
                    className={`input ${errors.name ? 'is-danger' : '' }`}
                    placeholder="Name"
                    name="name"
                    onChange={this.handleChange}
                    value={formData.name}
                  />
                </div>
                {errors.name && <small className="help is-danger">{errors.name}</small>}
              </div>
              <div className="field">
                {/* <label className="label">Email</label> */}
                <div className="control">
                  <input 
                    className={`input ${errors.email ? 'is-danger' : ''}`}
                    placeholder="Email"
                    name="email"
                    onChange={this.handleChange}
                    value={formData.email}
                  />
                </div>
                {errors.email && <small className="help is-danger">{errors.email}</small>}
              </div>
              <div className="field">
                {/* <label className="label">Password</label> */}
                <div className="control">
                  <input 
                    className={`input ${errors.password ? 'is-danger' : ''}`}
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={this.handleChange}
                    value={formData.password}
                  />
                </div>
                {errors.password && <small className="help is-danger">{errors.password}</small>}
              </div>
              <div className="field">
                {/* <label className="label">Password Confirmation</label> */}
                <div className="control">
                  <input 
                    type="password"
                    className={`input ${errors.passwordConfirmation ? 'is-danger' : ''}`}
                    placeholder="Password Confirmation"
                    name="passwordConfirmation"
                    onChange={this.handleChange}
                    value={formData.passwordConfirmation}
                  />
                </div>
                {errors.passwordConfirmation && <small className="help is-danger">{errors.passwordConfirmation}</small>}
              </div>
              <div className="field">
                <button type="submit" className="button is-success is-outlined is-fullwidth">Register</button>
              </div>
              <div className="field">
                <button type="button" onClick={this.handleClick} className="button is-info is-outlined is-fullwidth">Registered? Sign in Here</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    )
  }
}

export default Register
