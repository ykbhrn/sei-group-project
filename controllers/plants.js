const Plant = require('../models/plant')

async function plantsIndex(req, res) {
  try {
    const plants = await Plant.find()
    res.status(200).json(plants)
  } catch (err) {
    res.json(err)
  }
}

async function plantCreate(req, res) {
  try {
    req.body.user = req.currentUser
    const createPlant = await Plant.create(req.body)
    res.status(201).json(createPlant)
  } catch (err) {
    res.status(422).json(err)
  }
}

async function plantShow(req, res) {
  const plantId = req.params.id
  try {
    const plant = await Plant.findById(plantId)
    // if (!plant) throw new Error('notFound')
    res.status(200).json(plant)
  } catch (err) {
    res.status(422).json(err)
  }
}
  
async function plantUpdate(req, res) {
  const plantId = req.params.id 
  try {
    const plant = await Plant.findByIdAndUpdate(plantId)
    if (!plant) throw new Error('Not Found')
    Object.assign(plant, req.body)
    await plant.save()
    res.status(202).json(plant)
  } catch (err) {
    res.status(422).json(err)
  }
}


async function plantDelete(req, res) {
  const plantId = req.params.id
  try {
    const plantToDelete = await Plant.findById(plantId)
    // if (!plantToDelete) throw new Error('notFound')
    // if (!plantToDelete.user.equals(req.currentUser._id))
    // throw new Error(unauthorized)
    await plantToDelete.remove()
    res.sendStatus(204)
  } catch (err) {
    res.status(422).json(err)
  }
}


module.exports = {
  index: plantsIndex,
  create: plantCreate,
  show: plantShow,
  delete: plantDelete,
  update: plantUpdate
}