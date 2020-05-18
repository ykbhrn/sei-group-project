const Plant = require('../models/plant')

async function like(req, res) {
  try {
    const user = req.currentUser //* from secureRoute
    const plant = await Plant.findById(req.body.plantId) //* querying database and requesting body with plantId -> sent via post method in routes with the body of the request

    let likes = plant.likes //* making a copy so we are not working on the original
    //* creating a variable for the like status, the default is false
    let likeStatus = false
    //* filtering the likes so we can receive a new array containing only the logged in user likes
    const likeCheck = likes.filter(like => like.userId === user._id.toString()) 
    //* this if statement checks if the user actually liked this plant
    if (likeCheck.length > 0) {
      //* if true we will remove the like as the user should only be able to like the same plant once
      //* by generating a new like array using the filter which excludes the current user and therefore removing the like
      likes = likes.filter(like => like.userId !== user._id.toString())
      //* else if this user has yet to like this plant
    } else {
      //* if a like is made the variable likeStatus is made true
      likeStatus = true
      //* we then include the userDetails and push them into the likes array
      const userDetails = { userId: user._id, username: user.name }
      likes.push(userDetails)
    }
    //* finished working on the copy and can now assign it back to the original plant.likes
    plant.likes = likes
    const updatedPlant = await plant.save()
    //* after saving we return the updatedPlant which returns the promise -> await plant.save() --> updatedPlant which is the plant only updated with or without the like
    //* sending a json compiled of likeStatus, likeCount and allf of the plant updated data
    const data = { likeStatus: likeStatus, likeCount: updatedPlant.likes.length, plantData: updatedPlant }
    res.status(200).json(data) //* update status
  } catch (err) {
    res.stauts(500).json(err)
  }
}

//* In short the user can "like" and "unlike"

module.exports = {
  like //* same as like: like
}