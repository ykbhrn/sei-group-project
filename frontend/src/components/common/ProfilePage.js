import React from 'react'
import { getPortfolio, makeOffer } from '../../lib/api'
import ProfileCard from '../common/ProfileCard'
import { Link } from 'react-router-dom'


class ProfilePage extends React.Component {

  state = {
    user: null,
    offerData: {
      offer: '',
      response: '',
      text: ''
    },
    id: '',
    isResponse: false
  }

  async componentDidMount() {
    try {
      const res = await getPortfolio()
      this.setState({ user: res.data })
    } catch (err) {
      console.log(err);
    }
  }

  handleChange = event => {
    
    const offerData = { ...this.state.offerData, [event.target.name]: event.target.value }
    this.setState( { offerData } )
  }

  handleSubmit = async (event, id) => {
    event.preventDefault()
    try {
      const res = await makeOffer(id, this.state.offerData)
      this.setState({ offerData: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  clicker = () => {
    this.setState({ isResponse: this.state.isResponse === false ? true : false })
  }

   componentDidCatch =  () => {
    const offerArray = this.state.user.createdPlants.filter( plant => {
      if (plant.offers.length > 0) {
        return plant
      }
    })
    let offerCounter = 0
    
    return offerArray.map( plant => {
      
      return plant.offers.map( offer => {
       
        offerCounter++
        return <div key={offer._id}>
          <div className='title is-3'>
          Nr.{offerCounter}: <br/>
          You've got offer on: {plant.name} <br/>
          Offer: {offer.offer} <br/>
          From: 
      <Link to={`/profile/${offer.user._id}`}> {offer.user.name}</Link>
          </div>
          <button
                className="button is-light"
                onClick={this.clicker}>Respond on offer
              </button>
              <hr />  
              {this.state.isResponse &&
                <>
                  <form onSubmit={this.handleSubmit} className="column is-half is-offset-one-quarter box">

                  <div className="field">
                      <label className="label">Price: </label>
                      <div className="control">
                        <textarea
                          placeholder="Message"
                          name="offer"
                          onChange={this.handleChange}
                          value={this.state.offerData.offer || ''}
                        />
                      </div>
                    </div>

                    Message from user: {offer.text} <br/>

                    <div className="field">
                      <label className="label">Respond to User: </label>
                      <div className="control">
                        <textarea
                          placeholder="Message"
                          name="text"
                          onChange={this.handleChange}
                          value={this.state.offerData.text || ''}
                        />
                      </div>
                    </div>

                    <div className="field">
                      <label className="label">Do You Accept the Offer: </label>
                      <div className="control">
                        <input
                          placeholder="Your Respond"
                          name="response"
                          onChange={this.handleChange}
                          value={this.state.offerData.response || ''}
                        />
                      </div>
                    </div>

                    <div className="field">
                      <button type="submit" className="button is-fullwidth is-warning"
                    
                      onClick={(event) => {
                        this.handleSubmit(event, plant._id)}}
                      >Submit Offer</button>
                    
                    </div>
                    <div className="field">
                      <button className="button is-fullwidth is-danger"
                      onClick={this.clicker}
                      >Cancel</button>
                    </div>
                  </form>
                    <hr />
              </>
              }
          </div>
      })
    })
  }

  render() {
    if (!this.state.user) return null
   console.log(this.state.offerData);

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