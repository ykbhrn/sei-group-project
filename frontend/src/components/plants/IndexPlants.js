import React from 'react'
import { getAllPlants } from '../../lib/api'
import CardPlant from './CardPlant'
import IndexMapThumb from '../common/IndexMapThumb'
import Notifications, {notify} from 'react-notify-toast'

class IndexPlants extends React.Component {
  state = {
    plants: []
  }

  async componentDidMount() {
    try {
      const res = await getAllPlants()
      console.log(res.data)
      const plants = res.data
      this.setState({ plants })

      const toastColor = { background: '#3FC008', text: 'white' }
      notify.show(`There are ${plants.length} Hot Plants in Your Area!`, 'custom', 5000, toastColor)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <>
      <div className="section">
        <Notifications />
          <IndexMapThumb plants={this.state.plants} />
      <section className="section">
        <div className="container">
          <div className="columns is-multiline">

            {this.state.plants.map(plant => ( // * Looping over each plant in the array, and producing a CardPlant component for each one, passing each one props of an induvidual cheese.
              <CardPlant key={plant._id} {...plant} />
            ))}
          </div>
        </div>
      </section>
      </div>
      </>
    )
  }

}
export default IndexPlants