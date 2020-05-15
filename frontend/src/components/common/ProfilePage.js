import React from 'react'
import { getPortfolio } from '../../lib/api'
import { Link } from 'react-router-dom'

class ProfilePage extends React.Component {

  state = {
    user: null
  }

  async componentDidMount() {
    try {
      const res = await getPortfolio()
      console.log(res);
      
      this.setState( {user: res.data})
    } catch (err) {
      console.log(err);
      
    }
  }

  render() {
    if (!this.state.user) return null
    console.log(this.state.user.createdPlants);
    
    return (
    
        <section className="section">
          <div>
        {this.state.user.name}
      
      </div>
        <div className="container">
          <div className="columns is-multiline">
          { this.state.user.createdPlants.map( plant => (
           
           <div className="column column is-one-quarter-desktop is-one-third-tablet is-8-mobile is-offset-2-mobile">
    {/* { To produce a correct address to navigate to the correct plants show page, we concatenate the id prop passed down to plant into the Link components "to" prop } */}
    <Link to={`/plants/${plant._id}`}>
      <div className="card">
        <div className="card-header">
          <h4 className="card-header-title">{plant.name}</h4>
        </div>
        <div className="card-image">
          <figure className="image image is-1by1">
            <img src={plant.imageUrl} alt={plant.name} />
          </figure>
        </div>
      </div>
    </Link>
  </div> 
          
        ))}
          </div>
        </div>
      </section>
    )
  }
 
}
export default ProfilePage