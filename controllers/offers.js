const Plant = require('../models/plant')
const Offer = require('../models/plant')
const User = require('../models/user')

async function newOffers(req, res) {
  try {
    

    const plantId = req.params.id
    const plant = await  Plant.findById(plantId)
    const user = await User.findById(req.currentUser._id)
    req.body.user = user
    // const makeOffer = await Offer.create(req.body)
    // console.log(makeOffer)
    
    if (!plant) throw new Error()

    plant.offers.push(req.body)
    // user.offers.push(req.body)

    await plant.save()
    // await user.save()

    res.status(201).json(plant)
  } catch (err) {
    res.status(422).json({ message: 'youre wrong' })
  }
}

module.exports = {
  newOffers
}