import React from 'react'
import { getPortfolio } from '../../lib/api'
import ProfileCard from '../common/ProfileCard'


class ProfilePage extends React.Component {

  state = {
    user: null
  }

  async componentDidMount() {
    try {
      const res = await getPortfolio()
    
      this.setState({ user: res.data })
    } catch (err) {
      console.log(err);
    }
  }

   componentDidCatch =  () => {
    const offerArray = this.state.user.createdPlants.filter( plant => {
      if (plant.offers.length > 0) {
        return plant
      }
    })
    return offerArray.map( plant => {
      return plant.offers.map( offer => {
        return <h1 key={offer._id} className='title is-1'>{offer.text}</h1>
      })
    })
    
    // offerArray.offers.map( offer => {
    //   return (
    //     <div>
    //       offer.text
    //     </div>
    //   )
    // }) 
  }

  render() {
    if (!this.state.user) return null
   

    return (
      <section className="section">
        <div className="container">
          <div>
            <h1 className="title is-1">{this.state.user.name}</h1>
          </div>
          <div className="columns is-multiline">
            {this.state.user.createdPlants.map(plant => (
              <ProfileCard key={plant._id} {...plant} />
            ))}
          </div>
        </div>
        <div>
          {this.componentDidCatch()}
        </div>
      </section>
    )
  }

}
export default ProfilePage