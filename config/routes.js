const router = require('express').Router()
const plants = require('../controllers/plants')


router.route('/plants')
  .get(plants.index)
  .post(plants.create)

module.exports = router