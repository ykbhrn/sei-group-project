import React from 'react'

import { sendChat, getPortfolio, filterChat } from '../../lib/api'


class Chat extends React.Component {
  state = {
    message: '',
    user: null,
    showMessages: false,
    filteredMessages: null
  }

  async componentDidMount() {
    try {
      const res = await getPortfolio()
      this.setState({ user: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  handleChange = (event) => {
    const message = { ...this.state.message, [event.target.name]: event.target.value }
    this.setState({ message })
  }

  handleSubmit = async (event, userId, receivedUserId) => {
    event.preventDefault()
    try {
      const res = await sendChat(userId, receivedUserId, this.state.message)
      this.setState({ message: res.data })
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }


  filterMessages = async (id, userid) => {
    this.setState({ showMessages: this.state.showMessages === false ? true : false })
    try {
      const res = await filterChat(id, userid)
      this.setState({ filteredMessages: res.data })
      console.log(res.data);
      
    } catch (err) {
      console.log(err)
    }
  }



  render() {
    if (!this.state.user) return null
    let counter = 0
    return (
      <section>
        {this.state.user.chat.map(message => {
          counter++
          let showForm = true
          if (counter > 1) {
            showForm = false
          }
          return (
            <>
              <div>
                {message.text}
              </div>
              {this.state.showMessages &&
                <>
                  {showForm &&
                    <>
                      <div className="field">
                        <label className="label">Message for User: </label>
                        <div className="control">
                          <textarea
                            placeholder="Message"
                            name="text"
                            onChange={this.handleChange}
                          />
                        </div>
              Message from: {message.userName}
                      </div>
                      <div className="field">

                        <button type="submit" className="button is-warning"
                          onClick={(event) => {
                            this.handleSubmit(event, this.state.user._id, message.userId)
                          }}
                        >Send</button>
                      </div>
                    </>
                  }
                </>
              }
              <button type="submit" className="button is-warning"
                onClick={() => {
                  this.filterMessages(this.state.user._id, message.userId)
                }}
              >Open chat with {message.userName}</button>
            </>
          )
        })}
      </section>
    )
  }
}

export default Chat
