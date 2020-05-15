import React from 'react'
import { getPortfolio } from '../../lib/api'

class ProfilePage extends React.Component {

  state = {
    plants: null
  }

  async comoponentDidMount() {
    try {
      const res = await getPortfolio()
      console.log(res.data);
      
    } catch (err) {
      console.log(err);
      
    }
  }

  render() {
    // if (!this.state.plant) return null
    return (
      <div>
        Hello
      </div>
    )
  }
 
}
export default ProfilePage