const mongoose = require('mongoose')
const dbURI = 'mongodb://localhost/plants-db'
const Plant = require('../models/plant')
const User = require('../models/user')
const plantsData = require('./data/plants')
const usersData = require('./data/users')

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  async (err, db) => {
    if (err) return console.log(err)

    try {
      await db.dropDatabase()

      const users = await User.create(usersData)
      console.log(`${users.length} admin users created 👩‍💻`)

      const plantsWithUsers = plantsData.map(plant => {
        return { ...plant, user: users[0]._id }
      })
    
      const plants = await Plant.create(plantsWithUsers)
      console.log(`${'🌱 '.repeat(plants.length)} plants created`)

      await mongoose.connection.close()
      console.log('Goodbye')
    
    } catch (err) {
      console.log(err)
    }
  }
)
