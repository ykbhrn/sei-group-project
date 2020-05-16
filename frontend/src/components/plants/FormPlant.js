import React from 'react'
import Select from 'react-select'
import ImageUpload from './ImageUpload'
import { render } from 'react-dom'
import { getTrefleData } from '../../lib/api'

class FormPlant extends React.Component {
  state = {
    options: []
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
              <input
                className={`textarea ${errors.description ? 'is-danger' : ''}`}
                placeholder="Description"
                name="description"
                rows="10"
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
            <button type="submit" className="button is-fullwidth is-warning">{buttonText}</button>
          </div>
        </form>
      </div>
    )
  }

}

export default FormPlant