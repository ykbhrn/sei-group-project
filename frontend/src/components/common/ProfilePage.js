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
// THis function just get all the user portfolio
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
//  This function toggle Respond on Offer button
  clicker = () => {
    this.setState({ isResponse: this.state.isResponse === false ? true : false })
  }
// Responses on your offers function
 handleResponse = () => {
  const offerArray = this.state.user.createdPlants.filter( plant => {
    if (plant.offers.length > 0) {
      return plant
    }
  })
    
    // const responseArray = offerArray.filter( offerPlant => {

    //       return offerPlant.offers.response === true
        
    // })

    return offerArray.map( responsePlant => {
      return responsePlant.offers.map( response => {
      return <>
        {response.response && 
        <div className="title is-4">
        You have a response from: <br/>
        <p>
        <Link to={`/profile/${response.user._id}`}> {response.user.name}</Link> <br/>
        On Plant: <br/>
        <Link to={`/plants/${responsePlant._id}`}> {responsePlant.name}</Link> <br/>
        User Decision: <br/>
        <span className="offer-response">{response.response}</span>
        </p>
        <hr />  
        </div>
      }
       </>
        
       })
      
    })

   
 
}


  //  This function will show user received offers
   componentDidCatch =  () => {
      // array of  plants which contains offers
    const offerArray = this.state.user.createdPlants.filter( plant => {
      if (plant.offers.length > 0) {
        return plant
      }
    })
    let offerCounter = 0
    //  maping all the plants with offers
    return offerArray.map( plant => {
      // * accesing offers
      return plant.offers.map( offer => {

        if(this.state.user.name === offer.user.name) return null

        offerCounter++
        return <div key={offer._id}>
        {/* //* Offers on your plants Code  */}
          <div className='title is-4'>
          <p>
          Nr.{offerCounter}: <br/>
          You have offer from: <br/>
          <Link to={`/profile/${offer.user._id}`}> {offer.user.name}</Link> <br/>
          On plant: <br/>
          <Link to={`/plants/${plant._id}`}> {plant.name}</Link> <br/>
          Price: <br/>
           {offer.offer} <br/>
      </p>
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
          <div className='offers-container'>

          {/* Received offers jsx code in that function */}
          <div className='offers'>
          <h1 className="title is-3 is-sucess">Your Offers: </h1>
          <br/>
          {this.componentDidCatch()}
          </div>

          {/* Responses for your offers */}
          <div className='responses'>
          <h1 className="title is-3 is-sucess">Responses from the Users: </h1>
          <br/>
          {this.handleResponse()}
          </div>
        </div>
        </div>
    
      </section>
    )
  }

}
export default ProfilePage