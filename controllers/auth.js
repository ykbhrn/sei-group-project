const User = require('../models/user')
// const jwt = require('jsonwebtoken')
// const secret  = 'abcd'

async function register(req, res) {
  try {
    const user = await User.create(req.body)
    res.status(201).json({ message: `${user.email} has been registered` })
  } catch (err) {
    res.status(422).json(err)
  }
}

module.exports = {
  register
}