import React from 'react'
import FormPlant from './FormPlant'
import { newPlant } from '../../lib/api'
import { handlePlantFormErrors } from '../../lib/formErrors'
// import AutocompletePlace from './AutocompletePlace'

class NewPlant extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formData: { //* our formData in state, matches the object we need to send in the request
        name: '',
        imageUrl: '',
        description: '',
        height: '',
        nickName: '',
        location: []
      },
      options: [],
      errors: {
        name: '',
        imageUrl: '',
        description: '',
        height: '',
        nickName: '',
        location: ''
      }, // * an object to store any errors that could occur when making the request.
      place: null
    }
    this.handleSelect = this.handleSelect.bind(this)
  }
  handleSelect(lat, lon) {
    const formData = { 
      ...this.state.formData, location: [{lat: lat, lon: lon}]
    }
    this.setState({ formData })
    console.log('parent', this.state.formData.location)
  }


  handleChange = event => {
    console.log(event)
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    const errors = { ...this.state.errors, [event.target.name]: '' }
    this.setState( { formData, errors } )
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
      await newPlant(this.state.formData)
      this.props.history.push(`/plants`)
    } catch(err) {
      const errors = handlePlantFormErrors(err.response.data.errors)
      this.setState(errors)
      console.log('submission err', err.response.data.errors)
    }
  }
  handleSelectChange = event => {
    const sciName = { ...this.state.formData, scientificName: event.value } 
    const errors = { ...this.state.errors, [event.name]: '' } 
    this.setState({ formData: sciName, errors }) 
    console.log(this.state.formData.scientificName)
  }

  setImgUrl = (childData) => {
    const formData = { ...this.state.formData, imageUrl: childData }
    this.setState({ formData })
  }


  render() {
    return (
      <section className="section">
        <div className="container">
        {/* <AutocompletePlace onSelect={this.handleSelect} />
        {!this.state.place && <div>No place selected</div>}
        {this.state.place && <div>Info about the place: <pre>{JSON.stringify(this.state.place,null,2)}</pre></div>} */}
          <FormPlant
            formData={this.state.formData}
            errors={this.state.errors}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            onSelect={this.handleSelect}
            handleSelectChange={this.handleSelectChange}
            imageUrl={this.setImgUrl}
            buttonText="Add My Plant"
          />
        </div>
      </section>
    )
  }
}
export default NewPlant