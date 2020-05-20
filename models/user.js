const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const submittedOfferSchema = new mongoose.Schema({
  offer: { type: String, required: false },
  text: { type: String, required: false },
  response: { type: String, required: false },
  userName: { type: String, required: false }, 
  plantName: { type: String, required: false },
  plantId: { type: String, required: false },
  userId: { type: String, required: false },
  email: { type: String, required: false },
  plantImageUrl: { type: String, required: false },
  offeredImageUrl: { type: String, required: false },
  offeredPlantId: { type: String, required: false },
  offeredPlantName: { type: String, required: false }
}, {
  timestamps: true
})

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unqie: true, maxlength: 50 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  submittedOffers: [submittedOfferSchema]
})

userSchema.virtual('createdPlants', {
  ref: 'Plant',
  localField: '_id',
  foreignField: 'user'
})


// userSchema.virtual('submittedOffers', {
//   ref: 'Offer',
//   localField: '_id',
//   foreignField: 'user'
// })


userSchema
  .set('toJSON', {
    virtuals: true, 
    transform(doc, json) {
      delete json.password
      return json
    }
  })

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema
  .virtual('passwordConfirmation')
  .set(function(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

userSchema
  .pre('validate', function(next) {
    if (this.isModified('password') && this._passwordConfirmation !== this.password) {
      this.invalidate('passwordConfirmation', 'does not match')
    }
    next()
  })

userSchema
  .pre('save', function(next) {
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8))
    }
    next()
  })

userSchema.plugin(require('mongoose-unique-validator'))

module.exports = (mongoose.model('User', userSchema), mongoose.model('Submit', submittedOfferSchema))