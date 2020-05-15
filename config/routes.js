const router = require('express').Router()
const plants = require('../controllers/plants')
const auth = require('../controllers/auth')


router.route('/plants')
  .get(plants.index)
  .post(plants.create)

router.route('/register')
  .post(auth.register)

module.exports = router