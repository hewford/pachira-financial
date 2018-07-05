const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/dev')
require("../models/User");

const User = mongoose.model('users')

passport.serializeUser((user, done) => {
    console.log(user)
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    console.log(id)
    done(null, id)
})

passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
      },
      (accessToken, refreshToken, profile, done) => {
          console.log(accessToken)
          console.log(profile)
        User.findOne({ googleId: profile.id }).then(existingUser => {
          if (existingUser) {
              console.log(existingUser)
            // we already have a record with the given profile ID
            done(null, existingUser)
          } else {
            // we don't have a user record with this ID, make a new record!
            new User({
                googleId: profile.id,
                email: profile.emails[0].value,
                gender: profile.gender,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                photo: profile.photos[0].value
                })
              .save()
              .then(user => done(null, user))
          }
        })
      }
    )
)