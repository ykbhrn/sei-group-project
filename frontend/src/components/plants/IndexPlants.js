import React from 'react'
import { getAllPlants } from '../../lib/api'

class IndexPlants extends React.Component {
state = {
  plants: null,
}

async componentDidMount() {
  try {
    const res = await getAllPlants()
    this.setState( { plants: res.data })
  } catch (err) {
    console.log(err);
  }
}

render() {
if(!this.state.plants) return null
console.log(this.state.plants);
  return (
    <section className="section">
      <div className="container">
        <div className="columns is-multiline">

      { this.state.plants.map( plant => {
        return (
          <div className="column is-one-quarter"
          key={plant._id}
          >
            <div className="card">
            <img src={plant.imageUrl} alt={plant.name} />
            </div>
            </div>
        )
      })}

      </div>
      </div>
      </section>
  )
}

}
export default IndexPlants