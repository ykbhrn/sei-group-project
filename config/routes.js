const router = require('express').Router()
const plants = require('../controllers/plants')
const auth = require('../controllers/auth')
const user = require('../controllers/users')
const publicUser = require('../controllers/publicProfiles')
const secureRoute = require('../lib/secureRoute')
const apiProxies = require('../controllers/apiProxies')


router.route('/plants')
  .get(plants.index)
  .post(secureRoute, plants.create)

router.route('/plants/:id')
  .get(plants.show)
  .put(plants.update)
  .delete(plants.delete)

router.route('/register')
  .post(auth.register)

router.route('/login')
  .post(auth.login)

router.route('/profile')
  .get(secureRoute, user.profile)

router.route('/profile/:id')
  .get(publicUser.profile)
  
router.route('/trefle')
  .post(apiProxies.getTrefleInfo)

router.route('/maps')
  .post(apiProxies.getLocation)

module.exports = router