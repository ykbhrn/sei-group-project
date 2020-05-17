import React from 'react'
import MapGl, { Marker } from 'react-map-gl' // The map component
import 'mapbox-gl/dist/mapbox-gl.css' // any CSS styling needed to make the map work
import { getAllPlants } from '../../lib/api'

const token = 'pk.eyJ1IjoiYWlub2t5dG8iLCJhIjoiY2thNTVmcHo1MGp0NTNtb2FiMDN2Y2lsNSJ9.lYIXm2Oh9WpDzSysWqwnqA'

class Maps extends React.Component {
  state = { plants: null }

  async componentDidMount() {
    try {
      const res = await getAllPlants()
      // console.log(res.data)

      this.setState({ plants: res.data })
      // console.log(this.state.plants)

      // this.state.plants.map(each => (
      // console.log(each.location[0].lat, each.location[0].lon))
      // )

    } catch (err) {
      console.log(err)
    }
  }

  render() {
    if (!this.state.plants) return null
    return (
      <div>
        <MapGl
          mapboxApiAccessToken={token}
          height={'100vh'}
          width={'100vw'}
          mapStyle='mapbox://styles/mapbox/light-v10'
          latitude={51.515}
          longitude={-0.078}
          zoom={11}
        >
          {this.state.plants.map(plant => {
            return plant.location.map(item => {
              return <div key={item._id}>
                <Marker
                  latitude={item.lat}
                  longitude={item.lon}
                >
                  <span role="img" aria-label="marker">🌱</span>
                </Marker>
              </div>
            })
          })}
        </MapGl>
      </div>
    )
  }
}

export default Maps