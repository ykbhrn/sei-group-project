const mongoose = require('mongoose')

// const likeSchema = new mongoose.Schema({
//   likes: { type: String, required: true },
//   user: { type: Object, required: false }
// }, {
//   timestamps: true
// })


const offerSchema = new mongoose.Schema({
  offer: { type: String, required: true },
  text: { type: String, required: false },
  imageUrl: { type: String, required: false },
  plantId: { type: String, required: false },
  name: { type: String, required: false },
  user: { type: Object, required: true }
}, {
  timestamps: true
})

const plantSchema = new mongoose.Schema({
  nickName: { type: String, required: true },
  name: { type: String, required: true },
  scientificName: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true, maxlength: 1000 },
  height: { type: String, required: true },
  location: [ { lat: Number, lon: Number }, { required: false } ],
  likes: [{ userId: String, username: String }, {  required: false  }], 
  offers: [ offerSchema ],
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})



plantSchema.plugin(require('mongoose-unique-validator'))

module.exports =   ( mongoose.model('Offer', offerSchema), mongoose.model('Plant', plantSchema) )
