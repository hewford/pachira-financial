const passport = require('passport')
const mongoose = require('mongoose')
require("../models/User");
const tools = require('../utils/financial-calculations')
const User = mongoose.model('users')
const Plan = mongoose.model('plans')

module.exports = app => {

  app.get('api/test', (req, res) =>{
    res.send('success')
  })
  
  // store user assumptions entries
  app.post('/api/post-assumptions', (req, res) => {
    console.log(req.user)
    User.findOne({ _id: req.user }).then(user => {
      console.log(user)
      if(!user) {
        res.status(400).send('user not found')
      }

      user.planInputs.assumptions = req.body

      user.save()

      res.send(user.planInputs.assumptions)
    })
  })

  // store user assumptions entries
  app.post('/api/post-growthAssumptions', (req, res) => {
    console.log(req.user)
    User.findOne({ _id: req.user }).then(user => {
      console.log(user)

      user.planInputs.growthAssumptions = req.body

      user.save()

      res.send(user.planInputs.growthAssumptions)
    })
  })

  app.post('/api/post-currentStatus', (req, res) => {
    console.log(req.user)
    User.findOne({ _id: req.user }).then(user => {
      console.log(user)

      user.planInputs.currentStatus = req.body

      user.save()

      res.send(user.planInputs.currentStatus)
    })
  })

  // store user assumptions entries
  app.post('/api/post-pensions', (req, res) => {
    console.log(req.user)
    User.findOne({ _id: req.user }).then(user => {
      console.log(user)

      user.planInputs.pensions = req.body

      user.save()

      res.send(user.planInputs.pensions)
    })
  })

  // calculate user retirement plan
  app.get('/api/calculate', (req, res) => {
    console.log(req.user)
    console.log(tools)
    User.findOne({ _id: req.user }).then(user => {
      console.log(user)

      let plan = new Plan({
        assumptions: user.planInputs.assumptions,
        growthAssumptions: user.planInputs.growthAssumptions,
        currentStatus: user.planInputs.currentStatus,
        pensions: user.planInputs.pensions
      })

      const contributions = user.planInputs.currentStatus.contributions

      plan.currentPlan = tools.calculateFinancials(user.planInputs, contributions)

      plan.retirementGoal = tools.calRetirementGoal(plan.currentPlan, user.planInputs)

      plan.neededInitialContribution = tools.calcNeededInitialContribution(plan.retirementGoal, user.planInputs)

      plan.recommendedPlan = tools.calculateFinancials(user.planInputs, plan.neededInitialContribution)
      
      res.send(plan)
    })
  })


}
