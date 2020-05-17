import React from 'react'
import Register from '../auth/Register'
import Login from '../auth/Login'
import HomeCards from './Homepage/HomeCards'

class Home extends React.Component {
state = {
  showRegister: true
}

showFunction = (childData) => {
  this.setState({ showRegister: childData })
}

  render() {
    return (
      <>
        <div className="columns is-vcentered">
          <div className="column is-centered">
            <div className="container is-hidden-mobile">
              <HomeCards />
            </div>
          </div>
          <div className="column">
            <img src="https://res.cloudinary.com/jompra/image/upload/v1589738053/plntify_f9zfgd.svg"></img>
            {this.state.showRegister ? <Register switchForm={this.showFunction}/> : <Login switchForm={this.showFunction}/>}
            
          </div>
        </div>
      </>
    )
  }
}

export default Home