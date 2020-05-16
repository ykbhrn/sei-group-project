
const mongoose = require('mongoose')

const plantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  scientificName: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true, maxlength: 1000 },
  height: { type: String, required: false },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})
plantSchema.plugin(require('mongoose-unique-validator'))
module.exports = mongoose.model('Plant', plantSchema)