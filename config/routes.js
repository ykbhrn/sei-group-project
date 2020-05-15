const router = require('express').Router()
const plants = require('../controllers/plants')


router.route('/plants')
  .get(plants.index)
  .post(plants.create)

router.route('/plants/:id')
  .put(plants.update)

module.exports = router