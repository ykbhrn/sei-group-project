const User = require('../models/user')
const Chat = require('../models/chat')

async function sendMessage(req, res) {
  try {
    const senderId = req.params.senderid
    const sender = await User.findById(senderId)
    const receiverId = req.params.receiverid
    const receiver = await User.findById(receiverId)
 
    const createChat = await Chat.create(req.body)
    createChat.sender = sender
    createChat.receiver = receiver
    
    createChat.subChat.push(req.body)
    createChat.save()
  
    res.json(createChat)
    
  } catch (err) {
    res.status(422).json({ message: 'youre wrong' })
  }
}

module.exports = {
  sendMessage
}