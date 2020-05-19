import React from 'react'

import { addComment, getSinglePlant } from '../../lib/api'

class Comments extends React.Component {
  state = {
    plant: null,
    text: ''
  }

  async getData() { //* this function can be called whenever you need to update the info on the page  
    try {
      const plantId = this.props.plantId
      const res = await getSinglePlant(plantId)
      this.setState({ plant: res.data })
      // console.log(this.state.plant.comments)
    } catch (error) {
      console.log(error)
      // this.props.history.push('/notfound')
    }
  }
  componentDidMount() { 
    // console.log(this.props.plantId)
    this.getData() //* calling the getData function as soon as the page loads to display the info straight away 
  }

  
//* COMMENTS
commentHandleChange = event => {
  const text = event.target.value //* saving what the user types into the comment box
  this.setState({ text }) //* setting state with their comment 
  }

commentHandleSubmit = async event => {
event.preventDefault()
const plantId = this.props.plantId
try {
  await addComment({text: this.state.text}, plantId) //* the add comment function requires a text field so you can pass it through like so - also it needs to match the order that you're using the arguments in your api.js file
  this.setState({ text: '' }) //* setting the comment box back to empty
} catch(err) {
  console.log(err.response.data)
}
this.getData() //* calling this getData function again to reload the page with the new database info and display your new comment straight away!
}

render() {
  if (!this.state.plant) return null
  const { plant, text } = this.state //* text field in state
  console.log(text)
  return (
    <div>
    <p>
    {plant.comments.map(comment => {
      return (
        <p key={comment._id}> {comment.text} </p>
      )
    })}
    </p>
<form onSubmit={this.commentHandleSubmit}> 
    <textarea 
  className="textarea"
  placeholder="Enter your comment here"
  name="text"
  onChange={this.commentHandleChange}
  value={text} 
/>
{/* the value is now what ever text in state is */}
<button type="submit" className="comment-submit-button">Add Comment</button>
</form>
</div>
  )
}

}

export default Comments 

