const User = require('../models/user')


async function publicProfile(req, res, next) {
  const userId = req.params.id
  try {
    const user = await User.findById(userId).populate('createdPlants')
    if (!user) throw new Error({ message: 'Not found' })
    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  profile: publicProfile
}