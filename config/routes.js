const router = require('express').Router()
const plants = require('../controllers/plants')
const auth = require('../controllers/auth')
const user = require('../controllers/users')
const publicUser = require('../controllers/publicProfiles')
const secureRoute = require('../lib/secureRoute')
const apiProxies = require('../controllers/apiProxies')
const offer = require('../controllers/offers')
const like = require('../controllers/likes')
const chat = require('../controllers/chat')


router.route('/plants')
  .get(plants.index)
  .post(secureRoute, plants.create)

router.route('/plants/:id')
  .get(plants.show)
  .put(secureRoute, plants.update)
  .delete(secureRoute, plants.delete)

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
  .post(secureRoute, apiProxies.getLocation)
  
router.route('/offer/:id/:plantid')
  .post(secureRoute, offer.newOffers)

router.route('/response/:id/:plantid/:decision/:offered')
  .post(secureRoute, offer.respondOffer)

router.route('/finish/:userid/:offerid/:plantid/:userplantid')
  .delete(secureRoute, offer.finishTrade)

// router.route('/chat/:id/:userid')
//   .post(secureRoute, chat.sendMessage)

// router.route('/chat/message/:id/:userid')
//   .post(chat.filterChat)

router.route('/likes')
  .post(secureRoute, like.like)

router.route('/plants/:id/comments')
  .post(secureRoute, plants.commentCreate)  

router.route('/plants/:id/comments/:commentid')
  .delete(secureRoute, plants.commentDelete) 

router.route('/photo')
  .post(apiProxies.photoSearch)

router.route('/summary')
  .post(apiProxies.getSummary)

module.exports = router