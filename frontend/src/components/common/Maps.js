
import React from 'react'
import MapGl, { Marker, NavigationControl, Popup } from 'react-map-gl' // The map component
import 'mapbox-gl/dist/mapbox-gl.css' // any CSS styling needed to make the map work
import { getAllPlants } from '../../lib/api'

const token = 'pk.eyJ1IjoiYWlub2t5dG8iLCJhIjoiY2thYmdqODRmMTY0aDJ5cDRvOWk1cTd6MyJ9.QIlx0yP5sKCZRAVrfrq3OA'

const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
}

class Maps extends React.Component {
  state = {
    viewport: {
      longitude: -0.098362,
      latitude: 51.513870,
      zoom: 11,
      height: '100vh',
      width: '100vw'
    },
    plants: null,
    selectedPlant: null,
    isShown: false
    //? plantId: null
  }

  async componentDidMount() {
    try {
      const res = await getAllPlants()
      const plants = res.data
      this.setState({ plants })
      //? this.getPlantId()

    } catch (err) {
      console.log(err)
    }
  }


  //? getPlantId = async () => {
  //?   const plantId = await this.state.plants.map(plant => {
  //?     return plant.location[0]._id
  //?   })
  //?   this.setState({ plantId })
  //? }

  handleClick = () => {
    console.log(this.state.selectedPlant._id)
    this.props.history.push(`plants/${this.state.selectedPlant._id}`)
    
  }


  handleMouseEnter = () => {
    console.log('entering')
    this.setState({ isShown: !this.state.isShown })
    console.log(this.state.isShown)
  }

  handleMouseLeave = () => {
    console.log('leaving')
    this.setState({ isShown: !this.state.isShown })
    console.log(this.state.isShown)
  }

  render() {
    if (!this.state.plants) return null

    const { viewport, plants, isShown, selectedPlant } = this.state

    console.log(this.state.selectedPlant)

    return (
      <div className="main">
        <MapGl
          {...viewport}
          mapboxApiAccessToken={token}
          mapStyle='mapbox://styles/mapbox/light-v10'
          onViewportChange={viewport => {
            this.setState({ viewport })
          }}
        >
          <div className="nav" style={navStyle}>
            <NavigationControl />
          </div>
          {plants.map(plant => {
            return <div className="marker"
              key={plant._id}
              // onMouseEnter={this.handleMouseEnter}
              // onMouseLeave={this.handleMouseLeave}
              onClick={(event) => {
                event.preventDefault()
                this.setState({ selectedPlant: plant })
              }}
            >
              <Marker
                latitude={plant.location[0].lat}
                longitude={plant.location[0].lon}
              >
                <span role="img" aria-label="marker">🌱</span>
              </Marker>
            </div>
          })
          }
          <div>
            {/* {isShown && (
              <Popup
                latitude={selectedPlant.location[0].lat}
                longitude={selectedPlant.location[0].lon}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
              >
                <div>
                  <h2>{selectedPlant.name}</h2>
                  <p>{selectedPlant.user}</p>
                </div>
              </Popup>
            )} */}
            {selectedPlant && (
              <Popup
                latitude={selectedPlant.location[0].lat}
                longitude={selectedPlant.location[0].lon}
                // onClose={() => {
                //   this.setState({ selectedPlant: null })
                // }}
              >
                <div onClick={this.handleClick}>
                  <h2>{selectedPlant.name}</h2>
                  <p>{selectedPlant.user}</p>
                </div>
              </Popup>
            )}
          </div>
        </MapGl >
      </div >
    )
  }
}

export default Maps