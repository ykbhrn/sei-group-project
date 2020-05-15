const router = require('express').Router()
const plants = require('../controllers/plants')
const auth = require('../controllers/auth')
const apiProxies = require('../controllers/apiProxies')


router.route('/plants')
  .get(plants.index)
  .post(plants.create)


router.route('/plants/:id')
  .get(plants.show)
  .put(plants.update)
  .delete(plants.delete)



router.route('/register')
  .post(auth.register)


router.route('/login')
  .post(auth.login)

router.route('/trefle')
  .post(apiProxies.getTrefleInfo)

module.exports = router