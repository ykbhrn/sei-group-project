const router = require('express').Router()
const plants = require('../controllers/plants')


router.route('/plants')
  .get(plants.index)
  .post(plants.create)


router.route('/plants/:id')
  .get(plants.show)
  // .put(plants.update)
  .delete(plants.delete)



module.exports = router