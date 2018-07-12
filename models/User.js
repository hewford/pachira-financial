const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  googleId: String,
  email: String,
  gender: String,
  firstName: String,
  lastName: String,
  photo: String,
  planInputs: {
    assumptions: Object,
    growthAssumptions: Object,
    currentStatus: Object,
    pensions: Object
  }
})

mongoose.model('users', userSchema)