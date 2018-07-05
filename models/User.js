const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  googleId: String,
  email: String,
  gender: String,
  firstName: String,
  lastName: String,
  photo: String
})

mongoose.model('users', userSchema)