import React from 'react'
import { getPublicPortfolio, createChat } from '../../lib/api'
import ProfileCard from '../common/ProfileCard'


class PublicProfile extends React.Component {

  state = {
    user: null,
    isChat: false,
    message: null
  }

  async componentDidMount() {
    try {
      const userId = this.props.match.params.id 
      const res = await getPublicPortfolio(userId)
      this.setState({ user: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  handleChange = event => {
    const message = { ...this.state.message, [event.target.name]: event.target.value }
    this.setState({ message })
  }

  handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const res = await createChat(this.state.user._id, this.state.message)
      this.setState({ message: res.data })
      this.clicker()
    } catch (err) {
      console.log(err)
    }
  }

  clicker = () => {
    this.setState({ isChat: this.state.isChat === false ? true : false })
  }

  render() {
    if (!this.state.user) return null
    console.log(this.state.message)
    
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

            <button onClick={this.clicker}>Start Chat</button>

            {this.state.isChat &&
                <>
                  <form 
                  onSubmit={this.handleSubmit}
                  className="column is-half is-offset-one-quarter box">
                  
                    <div className="field">
                      <label className="label">Message for User: </label>
                      <div className="control">
                        <textarea
                          className="input"
                          placeholder="Message"
                          name="text"
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <button type="submit" className="button is-warning">Send</button>
                    </div>
                  </form>
                  </>
                }
            
          </div>
        </div>
      </section>
    )
  }

}
export default PublicProfile