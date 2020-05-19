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
    const plantData = await axios.post('/api/summary', {query})
    console.log('plant data', plantData)
    const drilledData = plantData.data.query.pages
    for (var key in drilledData) {
      var lastObj = drilledData[key];
    }
    const extract =lastObj.extract
    if(extract) {
      console.log('first run: ', query)
      this.setState({ plantData: extract })
    } else {
      console.log('second run: ', query)
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