import React from 'react'

import { sendChat, getPortfolio, filterChat } from '../../lib/api'


class Chat extends React.Component {
  state = {
    message: '',
    user: null,
    showMessages: false,
    filteredMessages: null,
    isFilter: false
  }

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


  render() {
   return (
     <h1>hey</h1>
   )
    
  }
}

export default Chat
