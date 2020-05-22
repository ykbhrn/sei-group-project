import React from 'react'

import { getAllChats, sendMessage, getPortfolio } from '../../lib/api'


class Chat extends React.Component {
  state = {
    chats: null,
    user: null,
    text: '',
    isMessage: false,
    chatUser: ''
  }

  async componentDidMount() {
    try {
      const res = await getAllChats()
      this.setState({ chats: res.data })
      await this.componentDidMountUser()
    } catch (err) {
      console.log(err)
    }
  }

  async componentDidMountUser() {
    try {
      const res = await getPortfolio()
      this.setState({ user: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  handleChange = (event) => {
    const message = { ...this.state.text, [event.target.name]: event.target.value }
    this.setState({ message })
  }

  handleSubmit = async (event, chatid) => {
    event.preventDefault()
    try {
      const res = await sendMessage(chatid, this.state.message)
      this.setState({ message: res.data })
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }

handleUser = async (event, user) => {
  event.preventDefault()
  try {
    this.setState({chatUser: user})
    this.clicker()
  } catch(err) {
    console.log(err)
  }
}

  clicker = () => {
    this.setState({ isMessage: this.state.isMessage === false ? true : false })
  }

  render() {
    const { chats, message } = this.state
    if (!this.state.user) return null
    console.log(this.state.chats)
    console.log(this.state.chatUser)
    return (
      <>
   
      <main className="section">
          <div className="chatFormContainer">
              <form>
                {this.state.chats.map(chat => {
                  let counter = 0
                  let showForm = true
                  let textedUser = ''
                  if(chat.senderName == this.state.user.name) {
                    textedUser = chat.receiverName
                  }
                  if(chat.receiverName == this.state.user.name) {
                    textedUser = chat.senderName
                  }
                  
                  return chat.subChat.map(message => {
                    counter ++
                    if(counter > 1) {
                      showForm = false
                    }
                    return <>
                    {showForm &&
                    <>
                     <button 
                        onClick={(event) => {
                          this.handleUser(event, textedUser)
                        }}
                        className='button'
                      >{textedUser}</button>
                    </>
                  }
                  {this.state.chatUser !== textedUser ? showForm === true : showForm === false &&
                  <>
                    {this.state.isMessage &&
                    <>
                    {showForm && 
                    <>
                    <div className='title is-3'>Chat with {textedUser}</div>
                    </>
                    }
                        <h1>{message.text}</h1>
                        <hr/>
                       
                        <div className="chatForm">
                        <textarea
                          className="message"
                          name="text"
                          onChange={this.handleChange}
                        />
                        <button 
                        onClick={(event) => {
                          this.handleSubmit(event, chat._id)
                        }}
                        className='button'
                     >Send</button>
                        </div>
                  
                  </>
                }
                </>
                }
                    </>
                  })
                })
                }
                </form>
                </div>
             </main>
               </>
   )
  }
}

export default Chat





  // async componentDidMount() {
  //   try {
  //     const res = await getPortfolio()
  //     this.setState({ user: res.data })
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // handleChange = (event) => {
  //   const message = { ...this.state.message, [event.target.name]: event.target.value }
  //   this.setState({ message })
  // }

  // handleSubmit = async (event, userId, receivedUserId) => {
  //   event.preventDefault()
  //   try {
  //     const res = await sendChat(userId, receivedUserId, this.state.message)
  //     this.setState({ message: res.data })
  //     window.location.reload()
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }


  // filterMessages = async (id, userid) => {
  //   this.setState({ showMessages: this.state.showMessages === false ? true : false })
  //   try {
  //     const res = await filterChat(id, userid)
  //     this.setState({ filteredMessages: res.data, isFilter: true })
  //     console.log(res.data);

  //   } catch (err) {
  //     console.log(err)
  //   }
  // }