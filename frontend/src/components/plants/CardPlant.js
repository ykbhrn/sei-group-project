import React from 'react'
import { Link } from 'react-router-dom'
import Likes from '../common/Likes'

const CardPlant = ({ name, imageUrl, _id, likes }) => (
  <div className="column column is-one-quarter-desktop is-one-third-tablet is-8-mobile is-offset-2-mobile">
    {/* { To produce a correct address to navigate to the correct plants show page, we concatenate the id prop passed down to plant into the Link components "to" prop } */}
    <Link to={`/plants/${_id}`}>
      <div className="card">
        <div className="card-header">
          <h4 className="card-header-title">{name}</h4>
        </div>
        <div className="card-image">
          <figure className="image image is-1by1">
            <img src={imageUrl} alt={name} />
          </figure>
        </div>
      </div>
    </Link>
    <Likes
      likes={likes}
      plantId={_id}
    />
  </div>
)

export default CardPlant