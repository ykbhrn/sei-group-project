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
    this.componentDidCatch()
  }

   componentDidCatch =  () => {
    const offerArray = this.state.user.createdplants
  }

  render() {
    if (!this.state.user) return null
    console.log(this.state.user);

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
        <h1 className="title is-1"></h1>
        </div>
      </section>
    )
  }

}
export default ProfilePage