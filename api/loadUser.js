const mongoose = require('mongoose')

const User = require('./app/models/userModel')

const data = require('./data/user.json')

mongoose.connect(process.env.DATABASE_URL).then(async () => {
    console.log('Connected to database')
    const user = new User(data.user)
    await user.save()
    console.log('Done')
    mongoose.disconnect();

}, (err) => console.log('Failed to connect to database'));
