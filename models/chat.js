const mongoose = require('mongoose')

const subChatSchema = new mongoose.Schema({
  text: { type: String, required: true },
  sender: { type: String, required: true },
  receiver: { type: String, required: true }
})

const chatSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  subChat: [ subChatSchema ]
}, {
  timestamps: true
})

module.exports = mongoose.model('Chat', chatSchema) 
