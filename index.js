const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require('./config/keys')
const bodyParser = require('body-parser');
const cors = require("cors");
const path = require('path');

// https://blog.risingstack.com/node-js-logging-tutorial
// const debug = require('debug')('pachira-financial')
// const name = 'pachira-financial-app'
// debug('booting %s', name)

require('./services/passport')
console.log('loaded')

console.log('=========')
console.log('INDEX.JS HIT')
console.log('=========')

mongoose.connect(keys.mongoURI, { useNewUrlParser: true })

const app = express()

if (process.env.NODE_ENV === 'production') {

    app.use(express.static(path.join(__dirname, '/client/build')));
  
  }

  app.use(cors());
  app.use(bodyParser.json());
  
  app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [keys.cookieKey]
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())

require('./routes/authRoutes')(app)
require('./routes/planRoutes')(app)



const PORT = process.env.PORT || 5000
app.listen(PORT);
console.log(`Server running, listening to port ${PORT}`)