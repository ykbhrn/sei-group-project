
const mongoose = require('mongoose')

const plantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true, maxlength: 1000 },
  height: { type: Number, required: false }
}, {
  timestamps: true
})

module.exports = mongoose.model('Plant', plantSchema)