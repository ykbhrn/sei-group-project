const mongoose = require('mongoose')

const subChatSchema = new mongoose.Schema({
  text: { type: String, required: true },
  sender: { type: Object, required: false },
  receiver: { type: Object, required: false }
})

const chatSchema = new mongoose.Schema({
  sender: { type: Object, required: false },
  receiver: { type: Object, required: false },
  subChat: [ subChatSchema ]
}, {
  timestamps: true
})

module.exports = mongoose.model('Chat', chatSchema) 
