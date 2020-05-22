import React from 'react'
import { Link } from 'react-router-dom'
import Likes from '../common/Likes'

const CardPlant = ({ nickName, name, imageUrl, _id, likes, offers }) => (

  <div className="column column is-one-quarter-desktop is-one-third-tablet is-8-mobile is-offset-2-mobile">
    {/* { To produce a correct address to navigate to the correct plants show page, we concatenate the id prop passed down to plant into the Link components "to" prop } */}
    <div className="card">
      <Link to={`/plants/${_id}`}>
        <div>
          <div className="card-header">
            <h4 className="card-header-title">{nickName ? `${nickName} the ` : ''}{name.length > 17 ? `${name.split('').splice(0, 17).join('')}...` : name}</h4>
          </div>
          <div className="card-image">

            <figure className="image image is-1by1">
              <img src={imageUrl} alt={name} />
            </figure>
            <div className="card-content is-overlay">
              {offers.length > 0 ?
                <span className="tag is-primary">Plant Is Under Offer</span>
                :
                ''}
            </div>
          </div>

        </div>
      </Link>
      <div>
        <div>
          <Likes
            likes={likes}
            plantId={_id}
          />
        </div>

      </div>


    </div>
  </div >
)

export default CardPlant