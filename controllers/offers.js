const Plant = require('../models/plant')
const User = require('../models/user')
const Offer = require('../models/plant')

async function newOffers(req, res) {
  try {
    req.body.user = req.currentUser

    const plantId = req.params.id
    const plant = await  Plant.findById(plantId)

    console.log(plant)
    
    if (!plant) throw new Error()

    plant.offers.push(req.body)

    await plant.save()
    
    res.status(201).json(plant)
  } catch (err) {
    console.log(err)
    
    res.status(422).json({ message: 'youre wrong' })
  }
}

module.exports = {
  newOffers
}