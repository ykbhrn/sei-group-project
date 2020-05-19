import React from 'react'
import { Link } from 'react-router-dom'
import MapGl, { Marker, NavigationControl, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { getAllPlants } from '../../lib/api'

const token = 'pk.eyJ1IjoiYWlub2t5dG8iLCJhIjoiY2thYmdqODRmMTY0aDJ5cDRvOWk1cTd6MyJ9.QIlx0yP5sKCZRAVrfrq3OA'

//?AK Styles for navigation controllers

const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
}

class Maps extends React.Component {
  state = {
    viewport: { //?AK Initial positioning for the map - these change with every user interaction 
      longitude: -0.098362,
      latitude: 51.513870,
      // longitude: this.props.longitude,
      // latitude: this.props.latitude,
      zoom: 11,
      height: '100vh',
      width: '100vw'
    },
    plants: null,
    selectedPlant: null,
    showPlantId: null
  }

  //?AK GET request to get plants from database

  async componentDidMount() {
    try {
      const res = await getAllPlants()
      const plants = res.data
      this.setState({ plants })
      // console.log(this.props.latitude, this.props.longitude)
    } catch (err) {
      console.log(err)
    }
  }

  handleMouseEnter = (e) => {
    e.target.style.color = '#3FC008'
  }

  handleMouseLeave = (e) => {
    e.target.style.color = 'black' 
  }

  //?AK in render:
  //?AK using the spread operator to get viewport data from state
  //?AK sending new viewport data to state to update UI after each user interaction
  //?AK Mapping over plants array to return a marker for each plant
  //?AK onClick function to send target plant's data to state

  render() {
    if (!this.state.plants) return null
    const { viewport, plants, selectedPlant, showPlantId } = this.state
    // const { latitude, longitude } = this.props

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
              onMouseEnter={() => {
                this.setState({ showPlantId: plant })
              }}
              onMouseLeave={() => {
                this.setState({ showPlantId: null })
              }}
              onClick={(event) => {
                event.preventDefault()
                this.setState({ selectedPlant: plant, showPlantId: null })
              }}
            >
              <Marker
                latitude={plant.location[0].lat}
                longitude={plant.location[0].lon}
                offsetTop={10}
                offsetLeft={-12}
              >
                <img width={25} src={require("../../lib/plntify.svg")} alt="Plntify Logo" />
              </Marker>
            </div>
          })
          }
          <div>
          {showPlantId && (
                <Popup
                  latitude={showPlantId.location[0].lat}
                  longitude={showPlantId.location[0].lon}
                >
                  <div className="has-text-centered">
              <h2>{showPlantId.name}</h2>
              <p>Click plant!
              </p>
                  </div>
                </Popup>
              )}
          </div>
          <div>
            {selectedPlant && (
              <Popup
                latitude={selectedPlant.location[0].lat}
                longitude={selectedPlant.location[0].lon}
                closeOnClick={false}
                onClose={() => {
                  this.setState({ selectedPlant: null })
                }}
              >
                <Link to={`/plants/${selectedPlant._id}`}>
                  <div className="popup-container">
                    <h2 className="has-text-centered"
                      onMouseEnter={this.handleMouseEnter}
                      onMouseLeave={this.handleMouseLeave}>
                      {selectedPlant.name}
                    </h2>
                    <hr />
                    <img width={200} src={`${selectedPlant.imageUrl}`} alt={`${selectedPlant.name}`} />
                  </div>
                </Link>
              </Popup>
            )}
          </div>
        </MapGl >
      </div >
    )
  }
}

export default Maps

// attach Link to `plants/${this.state.selectedPlant._id} to the h2 tag `