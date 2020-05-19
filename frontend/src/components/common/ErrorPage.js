import React from 'react'
import { getPhoto } from '../../lib/api'
import {Redirect} from 'react-router-dom'


class NotFound extends React.Component {
  state = {
    backgroundImage: '',
    redirect: false,
    progress: 100
  }

  componentDidMount() {
    const timeBeforeRedirect = 5000
    this.getImage()
    //After five seconds to fire render redirect
    setTimeout(() => this.setState({redirect: true}), timeBeforeRedirect)
    setInterval(() => this.progressReducer(this.state.progress), timeBeforeRedirect / 100)
  }

  progressReducer = (currentNum) => {
    if (this.state.progress >0){
      const decrementedNumber = currentNum - 1
    this.setState({progress: decrementedNumber})
    }
    
  }

  getImage = async () => {
    const searchTerm = 'compass'
    const response = await getPhoto(searchTerm)
    const imageurl = response.data
    this.setState({ backgroundImage: imageurl})
  }

  renderRedirect = () => {
    if(this.state.redirect){
      return <Redirect to="/" />
    }
  }

  render() {
    return (
      <section className="hero is-success is-fullheight-with-navbar">
        {this.renderRedirect()}
        <div className="hero-body" style={{ backgroundImage: `url(${this.state.backgroundImage})` }}>
          <div style={{ backgroundColor: "black" }}>
            <h1 className="title is-1">
              Error 404
      </h1>
            <h2 className="subtitle">
              Page Not Found
      </h2>
      
          </div>
          <progress className="progress is-large is-success" value={this.state.progress} max="100"></progress>
        </div>
      </section>
    )
  }
}

export default NotFound