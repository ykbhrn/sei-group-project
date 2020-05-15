import React from 'react'
import axios from 'axios'
import Select from 'react-select'
import { newPlant } from '../../lib/api'

class NewPlant extends React.Component {

  state = {
    formData: {
      name: '',
      description: '',
      imageUrl: '',
      height: ''
    },
    options: []
  }

  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    console.log(this.state.formData)
    this.setState({ formData })
  }

  handleSubmit = async event => {
    try {
      event.preventDefault()
      await newPlant(this.state.formData)
      // this.props.history.push(`/plants`)
    } catch (err) {
      console.log(err);
    }
  }

  searchForScientific = async () => {
    // console.log('running with: ', this.state.formData.name)
    const searchQuery = this.state.formData.name
    const response = await axios.post('/api/trefle', { search: `${searchQuery}` })
    // console.log('response is: ', response.data)
    this.populateOptions(response.data)
  }

  populateOptions = async (plantData) => {
    const scientificNames = []
    plantData.forEach(plant => (
      scientificNames.push({ value: plant.scientific_name, label: plant.scientific_name })
    ))
    this.setState({ options: scientificNames })
    // console.log(this.state.options)
  }



  render() {
    return (
      <section className="section">
        <div className="container">
          <form onSubmit={this.handleSubmit} className="column is half is-offset-one-quarter box">
            <input className="input"
              placeholder="name"
              name="name"
              onChange={this.handleChange}
              value={this.state.formData.name}
            />
            <input className="input"
              placeholder="description"
              name="description"

              onChange={this.handleChange}
              value={this.state.formData.description}
            />
            <div className="field">
              <div className="control"
                onClick={this.searchForScientific}
              >
                <Select
                  options={this.state.options}
                  onChange={this.handleMultiChange}
                  placeholder="Scientific Name"
                />
              </div>
            </div>
            <input className="input"
              placeholder="Url of your plant image"
              name="imageUrl"
              onChange={this.handleChange}
              value={this.state.formData.imageUrl}
            />
            <input className="input"
              placeholder="height of your plant"
              name="height"
              onChange={this.handleChange}
              value={this.state.formData.height}
            />
            <div className="control">
              <button className="button is-link">Submit</button>
            </div>
          </form>
        </div>

      </section>
    )
  }
}
export default NewPlant