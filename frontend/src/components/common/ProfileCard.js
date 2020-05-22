import React from 'react'
import { Link } from 'react-router-dom'


const ProfileCard = ({ name, imageUrl, user, _id}) => (
  < div className = "column column is-one-quarter-desktop is-one-third-tablet is-8-mobile is-offset-2-mobile" >
  {/* { To produce a correct address to navigate to the correct plants show page, we concatenate the id prop passed down to plant into the Link components "to" prop } */ }
  <div className="container">
  <h2 className="title has-text-centered">{user.name}</h2>
  
  </div>
  < Link to = {`/plants/${_id}`}>
    <div className="card">
      <div className="card-header">
        <h4 className="card-header-title">{name.length > 17 ? `${name.split('').splice(0, 17).join('')}...` : name}</h4>
      </div>
      <div className="card-image">
        <figure className="image is-1by1">
          <img src={imageUrl} alt={name} />
        </figure>
      </div>
    </div>
  </Link >    
</div >
)


export default ProfileCard