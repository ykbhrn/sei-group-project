import React from 'react'
import axios from 'axios'

class PlantInfoBox extends React.Component {
  state = {
    scientificName: this.props.plantInfo.scientificName,
    commonName: this.props.plantInfo.name,
    plantData: '',

  }

  componentDidMount() {
    this.getPlantData(this.state.scientificName)
  }

  getPlantData = async (query) => {
    const response = await axios.post('/api/summary', {query})
    
    for (var key in response.data.query.pages) {
      var lastObj = response.data.query.pages[key];
    }

    const extract =lastObj.extract

    if(extract) {
      this.setState({ plantData: extract })
    } else {
      this.getPlantData(this.state.commonName)
    }
    
  }


  render(){
    console.log('box props', this.state.scientificName)
    return(
      <h1>{this.state.plantData}</h1>
    )
  }
}

export default PlantInfoBox