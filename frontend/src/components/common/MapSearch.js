import React from 'react'
import Select from 'react-select'

class MapSearch extends React.Component {
  state = {
    hotPlants: [],
    locationData: {
      latitude: null,
      longitude: null
    }
  }

  componentDidMount() {
    const hotPlants = this.props.plants.map(plant => {
      return ({ value: plant.location, label: plant.name })
    })
    this.setState({ hotPlants })
  }

  handleSelect = selected => {
  const selectedPlant = selected.value
  const locationData = { ...this.state.locationData, latitude: selectedPlant[0].lat, longitude: selectedPlant[0].lon }
  //? State one step behind... add callback function?
  //? loading asynchronously? https://react-select.com/async
  this.setState({ locationData })
  
  }

  render() {
    const { hotPlants } = this.state
    console.log(this.props)
    return (
      <div>
        <Select
          placeholder={`${hotPlants.length} Hot Plants in your Area are waiting for you...`}
          options={hotPlants}
          onChange={this.handleSelect}
          onFocus={(console.log('heyyy'))}
        />
      </div>
    )
  }
}

export default MapSearch