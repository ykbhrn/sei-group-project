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
    let offerCounter = 0

    return offerArray.map( plant => {
      console.log(plant);
      
      return plant.offers.map( offer => {

        offerCounter++
        return <div key={offer._id} className='title is-3'>
          Nr.{offerCounter}: <br/>
          You've got offer on: {plant.name} <br/>
          Offer: {offer.offer} <br/>
          Message from user: {offer.text} <br/>
          </div>
      })
    })
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
          <h1 className="title is-1">Your Offers: </h1>
          <br/>
          {this.componentDidCatch()}
        </div>
      </section>
    )
  }

}
export default ProfilePage