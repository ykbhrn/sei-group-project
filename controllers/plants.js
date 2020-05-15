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
    const createPlant = await Plant.create(req.body)
    res.status(201).json(createPlant)
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

module.exports = {
  index: plantsIndex,
  create: plantCreate,
  update: plantUpdate
}