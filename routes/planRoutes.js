const passport = require('passport')
const mongoose = require('mongoose')
require("../models/User");
const User = mongoose.model('users')

module.exports = app => {

  app.get('/api/current_user', (req, res) => {
    console.log(req.user)
    User.findOne({ _id: req.user }).then(existingUser => {
      console.log(existingUser)
      res.send(existingUser)
    })
  })
  
  // store user assumptions entries
  app.post('/api/post-assumptions', (req, res) => {
    console.log(req.user)
    User.findOne({ _id: req.user }).then(user => {
      console.log(user)

      user.planInputs.assumptions = req.body.assumptions

      user.save()

      res.send(user)
    })
  })

  // store user assumptions entries
  app.post('/api/post-growthAssumptions', (req, res) => {
    console.log(req.user)
    User.findOne({ _id: req.user }).then(user => {
      console.log(user)

      user.planInputs.growthAssumptions = req.body.growthAssumptions

      user.save

      res.send(user)
    })
  })

  app.post('/api/post-currentStatus', (req, res) => {
    console.log(req.user)
    User.findOne({ _id: req.user }).then(user => {
      console.log(user)

      user.planInputs.currentStatus = req.body.currentStatus

      user.save

      res.send(user)
    })
  })

  // store user assumptions entries
  app.post('/api/post-pensions', (req, res) => {
    console.log(req.user)
    User.findOne({ _id: req.user }).then(user => {
      console.log(user)

      user.planInputs.pensions = req.body.pensions

      user.save

      res.send(user)
    })
  })
}
