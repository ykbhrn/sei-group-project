const jwt = require('jsonwebtoken')
const User = require('../models/user')
const secret = 'abcd'

async function secureRoute(req, res, next) {
  try {
    if (!req.headers.authorization) throw new Error()

    const token = req.headers.authorization.replace('Bearer ', '')
    console.log('token is', token)
    console.log('secret is', secret)

    const payload = await jwt.verify(token, secret)
    console.log('payload is', payload)

    const user = await User.findById(payload.sub)

    if (!user) throw new Error()
    console.log('user is ', user)

    req.currentUser = user

    next()
    
  } catch (err) {
    res.status(401).json( { message: 'Unauthorized' } )
  }
}


module.exports = secureRoute