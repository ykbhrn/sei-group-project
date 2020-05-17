import React from 'react'
import { getAllPlants } from '../../../lib/api'


class HomeCards extends React.Component {
  state = {
    allPlants: [],
    plantImages: []
  }

  async componentDidMount() {
    try {
      const res = await getAllPlants()
      // console.log(res.data)
      this.setState({ allPlants: res.data })
      this.chooseimages()

    } catch (err) {
      console.log(err)
    }
  }


  chooseimages = () => {
    const images = []
    for (let i = 0; i < 9; i++) {
      const randomNum = Math.floor(Math.random() * 9)
      images.push(this.state.allPlants[randomNum].imageUrl)
    }
    this.setState({ plantImages: images })
  }


  render() {
    return (
      <section>

        <div className="columns">
        <div className="column">
          {this.state.plantImages.slice(0, 3).map((image, i) => (

              <figure key={i}
                className="image is-square">
                <img src={image} alt="plant" />
              </figure>

          ))}
          </div>
          <div className="column is-hidden-mobile">
            {this.state.plantImages.slice(3, 6).map((image, i) => (

                <figure key={i}
                  className="image is-square">
                  <img src={image} alt="plant" />
                </figure>

            ))}
          </div>
          <div className="column is-hidden-mobile">
            {this.state.plantImages.slice(6, 9).map((image, i) => (

                <figure key={i}
                  className="image is-square">
                  <img src={image} alt="plant" />
                </figure>

            ))}
          </div>
        </div>
      </section>

    )
  }
}

export default HomeCards