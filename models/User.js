const mongoose = require('mongoose')
const { Schema } = mongoose

const planSchema = new Schema({
  assumptions: Object,
  growthAssumptions: Object,
  currentStatus: Object,
  pensions: Object,
  currentPlan: Object,
  retirementGoal: Number,
  neededInitialContributions: Number,
  recommendedPlan: Object
})

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
  },
  plan: planSchema
})

mongoose.model('users', userSchema)
mongoose.model('plans', planSchema)