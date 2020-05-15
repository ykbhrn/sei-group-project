import React from 'react'
import { newPlant } from '../../lib/api'

class NewPlant extends React.Component {

  state = {
    formData: {
      name: '',
      description: '',
      imageUrl: '',
      height: ''
    }
  }

  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    this.setState( { formData } )
  }

  handleSubmit = async event => {
    try {
<<<<<<< HEAD
      
      const res = await newPlant(this.state.formData)
      this.props.history.push(`/plants/${res.data._id}`)
=======
       await newPlant(this.state.formData)
      // this.props.history.push(`/plants`)
>>>>>>> 40db1a7f9c5587f10346f860c83ca502a614b1b0
    } catch(err) {
      console.log(err);
    }
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
            <button type="submit">
              Add Plant
            </button>
            
          </form>
        </div>

      </section>
    )
  }
}
export default NewPlant