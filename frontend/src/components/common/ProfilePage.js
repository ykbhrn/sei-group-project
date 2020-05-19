import React from 'react'
import { getPortfolio, respondOffer, finishTrade } from '../../lib/api'
import ProfileCard from '../common/ProfileCard'
import { Link } from 'react-router-dom'


class ProfilePage extends React.Component {

  state = {
    user: null,
    offerData: {
      offer: '',
      response: '',
      text: '',
      userName: '',
      plantName: '',
      plantId: '',
      userId: ''
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
      console.log(err)
    }
  }

  handleChange = event => {
    const offerData = { ...this.state.offerData, [event.target.name]: event.target.value }
    this.setState({ offerData })
    console.log(event.target.name)
  }

  handleSubmit = async (event, id, plantId, offeredPlantId) => {
    event.preventDefault()
    try {
      const res = await respondOffer(id, plantId, 'Accepted', offeredPlantId, this.state.offerData)
      this.setState({ offerData: res.data })
      this.clicker()
    } catch (err) {
      console.log(err)
    }
  }
  handleSubmitDecline = async (event, id, plantId, offeredPlantId) => {
    event.preventDefault()
    try {
      const res = await respondOffer(id, plantId, 'Declined', offeredPlantId, this.state.offerData)
      this.setState({ offerData: res.data })
      this.clicker()
    } catch (err) {
      console.log(err)
    }
  }

finishTrade = async (id, plantid) => {
  try {
   await finishTrade(id, plantid)
    this.props.history.push('/profile')
  } catch(err) {
    this.props.history.push('/notfound')
  }
}

  //  This function toggle Respond on Offer button
  clicker = () => {
    this.setState({ isResponse: this.state.isResponse === false ? true : false })
  }
// Changing classes, depends on declined or accepted offer
  decisionClass = decision => {
    if (decision === 'Accepted') {
      return 'button is-warning is-fullwidth'
    }
    else {
      return 'button is-danger is-fullwidth'
    }
  }

  // Responses on your offers function
  handleResponse = () => {

    return this.state.user.submittedOffers.map(offer => {
      return <div className='title is-4'>

        You have response from: <Link to={`/profile/${offer.userId}`}> {offer.userName}</Link> <br />
          On plant: <Link to={`/plants/${offer.plantId}`}> {offer.plantName}<br />
          <img src={offer.plantImageUrl} alt={offer.plantName} />
        </Link>

          You are offering:  <Link to={`/plants/${offer.offeredPlantId}`}>{offer.offeredPlantName}<br />
          <img src={offer.offeredImageUrl} alt={offer.offeredPlantName} />
        </Link>

        <div className="field">
          <div className={this.decisionClass(offer.response)}>{offer.response}</div>
        </div>
        Message from user: < br />
        <div className="message">{offer.text}</div>
        {offer.userName} email for further communication:
        {offer.email}
        <div className="field">
                  <button type="submit" className="button is-warning"
                    onClick={() => {
                      this.finishTrade(offer.plantId, offer.offeredPlantId)
                    }}
                  >
                    Trade was finished
                  </button>
                  </div>
        <hr />
      </div>
    })

  }


  //  This function will show user received offers
  componentDidCatch = () => {
    // array of  plants which contains offers
    const offerArray = this.state.user.createdPlants.filter(plant => {
      if (plant.offers.length > 0) {
        return plant
      }
    })
    let offerCounter = 0
    //  maping all the plants with offers
    return offerArray.map(plant => {
      // * accesing offers
      return plant.offers.map(offer => {

        if (this.state.user.email === offer.user.email) return null

        offerCounter++
        return <div key={offer._id}>
          {/* //* Offers on your plants Code  */}
          <div className='title is-4'>

            <p>Nr.{offerCounter}: </p>
            <p>You have offer from: <Link to={`/profile/${offer.user._id}`}> {offer.user.name}</Link></p>
            <p>On plant: <Link to={`/plants/${plant._id}`}> {plant.name}
              <img src={plant.imageUrl} alt={plant.name} className="is-64x64" />
            </Link></p>
            <p>Message from {offer.user.name}: </p>
            <div className="message">{offer.text} </div>
          Offered Plant: <Link to={`/plants/${offer.plantId}`}>{offer.name}
              <img src={offer.imageUrl} alt={offer.name} />
            </Link>

            {/* <img src={offer.imageUrl} /> */}

          </div>
          <button
            className="button is-light"
            onClick={this.clicker}>Respond to the offer
           </button>
          <hr />
          {this.state.isResponse &&
            <>
              <form onSubmit={this.handleSubmit} className="column is-half is-offset-one-quarter box">

                <div className="field">
                  <label className="label">Message to {offer.user.name}: </label>
                  <div className="control">
                    <textarea
                      placeholder="Message"
                      name="text"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="field">
                  <button type="submit" className="button is-warning"
                    onClick={(event) => {
                      this.handleSubmit(event, offer.user._id, plant._id, offer.plantId)
                    }}
                  >Accept</button>

                  <button type="submit" className="button is-danger"
                    onClick={(event) => {
                      this.handleSubmitDecline(event, offer.user._id, plant._id, offer.plantId)
                    }}
                  >Decline</button>
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
    console.log(this.state.user)

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
              <hr />
              <br />
              {this.componentDidCatch()}
            </div>

            {/* Responses for your offers */}
            <div className='responses'>
              <h1 className="title is-3 is-sucess">Responses from the Users: </h1>
              <hr />
              <br />
              {this.handleResponse()}
            </div>
          </div>
        </div>

      </section>
    )
  }

}
export default ProfilePage