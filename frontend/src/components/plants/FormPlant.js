import React from 'react'
import Select from 'react-select'
import ImageUpload from './ImageUpload'
import { render } from 'react-dom'
import { getTrefleData } from '../../lib/api'
import axios from 'axios'



class FormPlant extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      options: [],
      search: '',
      results: [],
      isLoading: false,
      lon: '',
      lat: '',
      test: ''
    }
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleItemClicked = this.handleItemClicked.bind(this)
  }

  handleSearchChange(e) {
    this.setState({
      search: e.target.value,
      isLoading: true
    })

       // Stop the previous setTimeout if there is one in progress
    clearTimeout(this.timeoutId)

    // Launch a new request in 1000ms
    this.timeoutId = setTimeout(() => {
      this.performSearch()
    }, 1000)
  }
  performSearch() {
    if (this.state.search === "") {
      this.setState({
        results: [],
        isLoading: false
      })
      return
    }
    axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.state.search}.json?access_token=pk.eyJ1IjoieWFyZGVuNTAiLCJhIjoiY2thNTVnOXc3MDZ0NTNvbnVvN3Nhdm1obiJ9.QbdSEysOTf3gzai-WwOSow`)
      .then(response => {
        this.setState({
          results: response.data.features,

          isLoading: false
        })
      })
  }
handleItemClicked = async (place) =>  {

    const search = await place.place_name
    const lon = await place.geometry.coordinates[0]
    const lat = await place.geometry.coordinates[1]
    this.setState({
      lat: lat,
      lon: lon,
      search: search,
      results: []
    })
    console.log(this.state)
    this.props.onSelect(lat, lon)
    
  }
  
  getSciData = async () => {
    if (this.props.formData.name) {
      const sciNames = []
      const res = await getTrefleData(this.props.formData.name)
      const plantData = res.data
      plantData.forEach(obj => {
        sciNames.push({ value: obj.scientific_name, label: obj.scientific_name })
      })
      this.setState({ options: sciNames })
    }
  }
  // console.log('props: ', this.props.formData.name)
  render() {
    const { formData, errors, handleChange, handleSubmit, buttonText, handleSelectChange } = this.props //* deconstructing all props passed by either NewPlant or EditPlant
    return (

      <div className="columns">
        <form onSubmit={handleSubmit} className="column is-half is-offset-one-quarter box">
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                className={`input ${errors.name ? 'is-danger' : ''}`} // * using a ternary to attach the class "is-danger" to the input if it is present in the errors object, also only showing the small tag below.
                placeholder="Name"
                name="name"
                onChange={handleChange}
                value={formData.name}
              />
            </div>
            {errors.name && <small className="help is-danger">{errors.name}</small>}
          </div>
          <div className="field">
            <label className="label">Height</label>
            <div className="control">
              <textarea
                className={`input ${errors.height ? 'is-danger' : ''}`}
                placeholder="Height"
                name="height"
                onChange={handleChange}
                value={formData.height}
              />
            </div>
            {errors.height && <small className="help is-danger">{errors.height}</small>}
          </div>
          <div className="field">
            <label className="label">Scientific Name</label>
            <div className="control"
              onClick={this.getSciData}
            >
              <Select
                name="scientificName"
                onChange={handleSelectChange}
                options={this.state.options}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Image</label>
            <div className="control">
              <input
                className={`input ${errors.imageUrl ? 'is-danger' : ''}`}
                placeholder="Origin"
                name="imageUrl"
                onChange={handleChange}
                value={formData.imageUrl}
              />
            </div>
            {errors.imageUrl && <small className="help is-danger">{errors.imageUrl}</small>}
          </div>
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea
                className={`textarea ${errors.description ? 'is-danger' : ''}`}
                placeholder="Description"
                type="textarea"
                name="description"
                rows="7"
                cols="50"
                wrap="hard"
                onChange={handleChange}
                value={formData.description}
              />
            </div>
            {errors.description && <small className="help is-danger">{errors.description}</small>}
          </div>
          {/* <div className="field">
            <div className="control">
              <ImageUpload
                onChange={handleChange}
                name="image"
                labelText="Upload an Image"
              />
            </div>
          </div> */}
            <div className="field">
            <label className="label">Location</label>
            <div className="control">
          <div className="AutocompletePlace">
        <input
        className="input AutocompletePlace-input" type="text" value={this.state.search} onChange={this.handleSearchChange} placeholder="Type an address"
        />
        <ul className="AutocompletePlace-results">
          {this.state.results.map(place => (
            <li
              key={place.id}
              className="AutocompletePlace-items"
              onClick={() => this.handleItemClicked(place)}
            >
              {place.place_name}
            </li>
          ))}
          {this.state.isLoading && <li className="AutocompletePlace-items">Loading...</li>}
        </ul>
      </div>
      </div>
        {errors.location && <small className="help is-danger">{errors.loaction}</small>}
      </div>


          <div className="field">
            <button type="submit" className="button is-fullwidth is-warning">{buttonText}</button>
          </div>
        </form>
      </div>
    )
  }

}

export default FormPlant