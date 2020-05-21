import React from 'react'
import { getPublicPortfolio } from '../../lib/api'
import ProfileCard from '../common/ProfileCard'


class PublicProfile extends React.Component {

  state = {
    user: null
  }

  async componentDidMount() {
    try {
      const userId = this.props.match.params.id 
      const res = await getPublicPortfolio(userId)
      this.setState({ user: res.data })
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    if (!this.state.user) return null
    console.log(this.state.user);
    
    return (
      <section className="section">
        <div className="container">
          <div>
            <h1 className="title is-2 has-text-centered">{this.state.user.name}</h1>
            <hr />
          </div>
          <br/>
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
export default PublicProfile