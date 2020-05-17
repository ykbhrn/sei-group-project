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
      console.log(this.state.errors)
      this.setState({ redirect: true })
      
    } catch (err) {
      console.log(err)
      // this.setState({ errors: err.response.data.errors })
    }
  }

  renderRedirect = () => {
    if(this.state.redirect){
      return <Redirect to="/login" />
    }
  }

  sendData = () => {
    this.props.switchForm(false)
  }

  render() {
    const { formData, errors } = this.state
    console.log(this.state)
    return (
      <section className="section">
        {this.renderRedirect()}
        <div className="">
          <div className="columns">
            <form onSubmit={this.handleSubmit} className="column">
              <h1 className="has-text-centered">Sign Up Here</h1><br />
              <div className="field">
                {/* <label className="label">Name</label> */}
                <div className="control">
                  <input
                    className={`input ${errors.name ? 'is-danger' : ''}`}
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
                <button type="submit" className="button is-fullwidth is-success is-outlined">Register</button>
              </div>
              <div className="field">
              
                <button onClick={this.sendData}type="button" className="button is-fullwidth is-info is-outlined">Have an account? Sign in Here</button>
              
              </div>
            </form>
          </div>
        </div>
      </section>
    )
  }
}

export default Register
