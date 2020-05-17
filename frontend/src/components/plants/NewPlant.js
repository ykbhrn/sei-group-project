import React from 'react'
import FormPlant from './FormPlant'
import { newPlant } from '../../lib/api'

class NewPlant extends React.Component {

  state = {
    formData: { //* our formData in state, matches the object we need to send in the request
      name: '',
      imageUrl: '',
      description: '',
      height: ''
      // location: ''
    },
    options: [],
    errors: {} // * an object to store any errors that could occur when making the request.
  }

  handleChange = event => {
    console.log(event)
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    this.setState( { formData } )
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
      await newPlant(this.state.formData)
      this.props.history.push(`/plants`)
    } catch(err) {
      console.log(err);
    }
  }
  handleSelectChange = event => {
    const sciName = { ...this.state.formData, scientificName: event.value } 
    const errors = { ...this.state.errors, [event.name]: '' } 
    this.setState({ formData: sciName, errors }) 
    console.log(this.state.formData.scientificName)
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <FormPlant
            formData={this.state.formData}
            errors={this.state.errors}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleSelectChange={this.handleSelectChange}
            buttonText="Add My Plant"
          />
        </div>
      </section>
    )
  }
}
export default NewPlant