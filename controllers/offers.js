const Plant = require('../models/plant')
const User = require('../models/user')

async function newOffers(req, res,) {
  try {
    

    const plantId = req.params.id
    const plant = await  Plant.findById(plantId)
    const user = await User.findById(req.currentUser._id)
    const plantOwner = await User.findById(plant.user._id)
    req.body.user = user
    // const makeOffer = await Offer.create(req.body)
    console.log(plantOwner)
    
    if (!plant) throw new Error()

    plant.offers.push(req.body)

    // user.submittedOffers.push({ 
    //   offer: req.body.offer,
    //   text: req.body.text,
    //   response: req.body.response,
    //   userName: plantOwner.name,
    //   plantName: plant.name,
    //   plantId: plant._id,
    //   userId: plantOwner._id
    // })

    // user.submittedOffers.push(plant.offers[plant.offers.length - 1 ].user.name) 

    console.log(req.body)

    await plant.save()
    await user.save()

    res.status(201).json(plant.offers)
  } catch (err) {
    res.status(422).json({ message: 'youre wrong' })
  }
}

async function respondOffer(req, res) {
  try {
    req.body.user = req.currentUser
    const userId = req.params.id
    const user =  await  User.findById(userId)

    // req.body.user = user

    user.submittedOffers.push(req.body)
    await user.save()


    console.log(user)
    res.status(201).json(user)
  } catch (err) {
    console.log(err)
    
  }
}

module.exports = {
  newOffers,
  respondOffer
}