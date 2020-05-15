import React from 'react'

const FormPlant = ({ formData, errors, handleChange, handleSubmit, buttonText }) => { //* deconstructing all props passed by either NewPlant or EditPlant
  return (
    <div className="columns">
    <form onSubmit={handleSubmit} className="column is-half is-offset-one-quarter box">
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input
            className={`input ${errors.name ? 'is-danger' : '' }`} // * using a ternary to attach the class "is-danger" to the input if it is present in the errors object, also only showing the small tag below.
            placeholder="Name"
            name="name"
            onChange={handleChange}
            value={formData.name}
          />
        </div>
        {errors.name && <small className="help is-danger">{errors.name}</small>}
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
            className={`input ${errors.description ? 'is-danger' : ''}`}
            placeholder="Image URL"
            name="description"
            onChange={handleChange}
            value={formData.description}
          />
        </div>
        {errors.description && <small className="help is-danger">{errors.description}</small>}
      </div>
      <div className="field">
        <label className="label">Height</label>
        <div className="control">
          <textarea
            className={`textarea ${errors.height ? 'is-danger' : ''}`}
            placeholder="Tasting Notes...."
            name="height"
            onChange={handleChange}
            value={formData.height}
          />
        </div>
        {errors.height && <small className="help is-danger">{errors.height}</small>}
      </div>
      <div className="field">
        <button type="submit" className="button is-fullwidth is-warning">{buttonText}</button>
      </div>
    </form>
  </div>
)

}

export default FormPlant