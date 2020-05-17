import React from 'react'
import HomeCards from './Homepage/HomeCards'
import Register from '../auth/Register'
import Login from '../auth/Login'

class Home extends React.Component {

  state = {
    showRegister: false
  }

  switchFunction = (childData) => {
    this.setState({ showRegister: childData })
  }

  render() {
    console.log(this.state.showRegister)
    return (
      <div className="columns is-vcentered">
        <div className="column is-hidden-mobile is-half">
          <HomeCards />
        </div>
        <div className="column is-half">
          <img src="https://res.cloudinary.com/jompra/image/upload/v1589738053/plntify_f9zfgd.svg"></img>
          {this.state.showRegister ? <Register sendData={this.switchFunction}/> : <Login sendData={this.switchFunction}/>}
        </div>
      </div>



    )
  }
}

export default Home