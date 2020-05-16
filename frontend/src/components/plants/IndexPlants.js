import React from 'react'
import { getAllPlants } from '../../lib/api'
import CardPlant from './CardPlant'

class IndexPlants extends React.Component {
  state = {
    plants: []
  }

  async componentDidMount() {
    try {
      const res = await getAllPlants()
      console.log(res.data)
      this.setState({ plants: res.data })
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="columns is-multiline">
            {this.state.plants.map(plant => ( // * Looping over each plant in the array, and producing a CardPlant component for each one, passing each one props of an induvidual cheese.
              <CardPlant key={plant._id} {...plant} />
            ))}
          </div>
        </div>
      </section>
    )
  }

}
export default IndexPlants