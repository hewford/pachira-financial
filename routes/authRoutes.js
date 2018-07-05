const passport = require('passport')
const mongoose = require('mongoose')
require("../models/User");
const User = mongoose.model('users')

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  )
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/');
    }
  );
  app.get('/api/current_user', (req, res) => {
    console.log(req.user)
    User.findOne({ _id: req.user }).then(existingUser => {
      console.log(existingUser)
      res.send(existingUser)
    })
  })
  app.get('/api/logout', (req, res) => {
    req.logout()
    res.redirect('/');
  })
}
