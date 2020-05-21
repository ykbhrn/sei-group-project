const User = require('../models/user')


// async function sendMessage(req, res) {
//   try {
//     const userId = req.params.id
//     const receivedUserId = req.params.userid
//     const user = await User.findById(userId)
//     const receivedUser = await User.findById(receivedUserId)
//     console.log(req.body)
//     req.body.userId = user._id
//     req.body.userName = user.name
//     req.body.receivedUserId = receivedUser._id
//     req.body.receivedUserName = receivedUser.name
//     user.chat.push(req.body)
//     receivedUser.chat.push(req.body)

//     if (!req.body.text) throw new Error({ message: 'no body sent' })

//     await user.save()
//     await receivedUser.save()

//     res.status(201).json(req.body)
//   } catch (err) {
//     res.status(422).json(req.body)
//   }
// }

// async function filterChat(req, res) {

//   try {
//     const userId = req.params.id
//     const receivedUserId = req.params.userid
//     const user = await User.findById(userId)

//     const filteredChat =  user.chat.filter( message => {
//       if (message.userId === receivedUserId)
//         return message
//     })
//     req.body.filteredChat = filteredChat
//     res.status(201).json( req.body )
//   } catch (err) {
//     res.status(422).json(req.body)
//   }
// }

module.exports = {
  
}