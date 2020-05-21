const mongoose = require('mongoose')

const subChatSchema = new mongoose.Schema({
  text: { type: String, required: true }
  // sender: { type: Object, required: false },
  // receiver: { type: Object, required: false }
})

const chatSchema = new mongoose.Schema({
  senderName: { type: String, required: true },
  senderId: { type: String, required: true },
  receiverName: { type: String, required: true },
  receiverId: { type: String, required: true },
  subChat: [ subChatSchema ]
}, {
  timestamps: true
})

module.exports = mongoose.model('Chat', chatSchema) 
