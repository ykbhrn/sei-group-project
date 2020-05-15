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
      console.log(res);

      this.setState({ user: res.data })
    } catch (err) {
      console.log(err);

    }
  }

  render() {
    if (!this.state.user) return null
    console.log(this.state.user.createdPlants);

    return (
      <section className="section">
        <div className="container">
          <div>
            <h2>{this.state.user.name}</h2>
          </div>
          <div className="columns is-multiline">
            {this.state.user.createdPlants.map(plant => (
              <ProfileCard key={plant._id} {...plant} />
            ))}
          </div>
        </div>
      </section>
    )
  }

}
export default ProfilePage