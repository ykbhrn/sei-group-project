const mongoose = require('mongoose')

const subChatSchema = new mongoose.Schema({
  text: { type: String, required: true }
}, {
  timestamps: true
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
