const Plant = require('../models/plant')
const User = require('../models/user')

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
    const plant = await Plant.findById(plantId).populate({
      //* going into sub document -> comment.user and populating it with 'User'
      path: 'comments.user',
      model: 'User'
    })
    if (!plant) throw new Error('notFound')
    const user = await User.findById(plant.user)
    plant.user = user
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
    if (!plant.user.equals(req.currentUser._id)) throw new Error('Not Found')
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
    if (!plantToDelete) throw new Error('notFound')
    if (!plantToDelete.user.equals(req.currentUser._id)) throw new Error('Not found')
    await plantToDelete.remove()
    res.sendStatus(204)
  } catch (err) {
    res.status(422).json(err)
  }
}

// * POST - body = { a valid comment object }
// * URL - api/plants/:id/comments
async function plantsCommentCreate(req, res, next) {
  console.log('comment created')
  try {
    // * Find the plant that we are creating a comment on
    req.body.user = req.currentUser
    const plantId = req.params.id
    const plant = await Plant.findById(plantId)
    if (!plant) throw new Error('notFound')
    // * attach our comment object(sent in the request body) to that plant, pushing into its comments array
    plant.comments.push(req.body)
    console.log(plant)
    console.log(req.body)
    // * resave that plant with the new comments
    await plant.save()
    // * send back that plant in response, with new comment present
    res.status(201).json(plant)
  } catch (err) {
    next(err)
  }
}

// * DELETE 
// * URL = /plants/:id/comments/commentId
async function plantsCommentDelete(req, res, next) {
  try {
    // * find the plant to delete the comment from, find by id
    const user = req.currentUser._id
    const plantId = req.params.id
    const commentId = req.params.commentid

    const plant = await Plant.findById(plantId)
    if (!plant) throw new Error({ message: 'not found' })

    const commentToRemove = plant.comments.id(commentId)
    if (!commentToRemove) throw new Error({ message: 'notFound' })

    //* need toString the user in order to use the id. Checking to see if the user logged in matches the owner of the comment for security. If not Throw Error
    if (user.toString() !== commentToRemove.user.toString()) throw new Error({ message: 'not found' })

    await commentToRemove.remove()
    // * resave it again, with that comment deleted

    await plant.save()
    // * send no content to signfy deletion is complete

    res.sendStatus(204)
  } catch (err) {
    res.json(err.data)
  }
}

module.exports = {
  index: plantsIndex,
  create: plantCreate,
  show: plantShow,
  delete: plantDelete,
  update: plantUpdate,
  commentCreate: plantsCommentCreate,
  commentDelete: plantsCommentDelete
}