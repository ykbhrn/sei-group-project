const mongoose = require('mongoose')
const dbURI = 'mongodb://localhost/plants-db'
const Plant = require('../models/plant')
const User = require('../models/user')
const faker = require('faker')
const plantsData = require('./data/plants')
const usersData = require('./data/users')

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, async (err, db) => {
  
  if (err) return console.log(err) // * Any error in connnection will log here

  try {
    await db.dropDatabase()

    const allUsers = [] // * an array to push our 4 admin users + 300 fake users into

    for (let index = 0; index < 300; index++) { // * looping to created 300 users
      const name = faker.name.findName() // * using the faker package to generate a fake username
      allUsers.push({
        name: name,
        email: `${name.split(' ').join('')}@email.com`, // * created the email from that generated name
        password: 'pass', // * setting all the passwords the same
        passwordConfirmation: 'pass'
      })
    }

    const users = await User.create(usersData)
    console.log(`${users.length} admin users created 👩‍💻`)

    const plantsWithUsers = plantsData.map(plant => {
      return { ...plant, user: users[1]._id }
    })


    const createdUsers = await User.create(allUsers) //* also creates our 4 admin users + 300 fake users
    console.log(allUsers)

    console.log(`❇️ Created ${createdUsers.length} ❇️`)
    
    const plants = await Plant.create(plantsWithUsers)
    console.log(`${'🌱 '.repeat(plants.length)} plants created`)

    await mongoose.connection.close()
    console.log('Goodbye')
    
  } catch (err) {
    console.log(err) // * Log any errors that occer
  }

  mongoose.connection.close() // * Close connection at the end
})
