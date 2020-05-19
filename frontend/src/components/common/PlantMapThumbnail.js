import React from 'react'
import { Link } from 'react-router-dom'
import MapGl, { Marker } from 'react-map-gl' // The map component
import 'mapbox-gl/dist/mapbox-gl.css' // any CSS styling needed to make the map work
const token = 'pk.eyJ1IjoiYWlub2t5dG8iLCJhIjoiY2thNTVmcHo1MGp0NTNtb2FiMDN2Y2lsNSJ9.lYIXm2Oh9WpDzSysWqwnqA'

const PlantMapThumbnail = (props) => {
  return (
    <div>
      <Link to={'/maps'}>
        <MapGl
          mapboxApiAccessToken={token}
          height={'30vh'}
          width={'30vw'}
          mapStyle='mapbox://styles/mapbox/light-v10'
          latitude={props.lat}
          longitude={props.lon}
          zoom={11}
        >
          <div key={props._id}>
            <Marker
              latitude={props.lat}
              longitude={props.lon}
            >
              <img src={require("../../lib/plntify.svg")} alt="Plntify Logo" height="25vh" width="25vw" />
            </Marker>
          </div>
        </MapGl>
      </Link>
    </div>
  )
}

export default PlantMapThumbnail
