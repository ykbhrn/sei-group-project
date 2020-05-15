const User = require('../models/user')

async function userProfile(req, res, next) {
  try {
    const user = await User.findById(req.currentUser._id).populate('createdPlants')
    if (!user) throw new Error({ message: 'Not found' })
    res.status(200).json(user)
    // res.json({ message: 'heyyy' })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  profile: userProfile
}