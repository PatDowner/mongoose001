require('dotenv').config()

// Pre-coding steps:
// npm init -y
// gitignore
// npm i express mongoose

const express = require('express')
const { join } = require('path')
const passport = require('passport')
const { Strategy } = require('passport-local')
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt')
const { User } = require('./models')

const app = express()

app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// BOILERPLATE USER AUTHENTICATION STUFF

// passport middleware
// new passport app
app.use(passport.initialize())
// to track status of log in, each log in = new session
app.use(passport.session())

// rules for passport itself
// new instance of user
passport.use(new Strategy(User.authenticate()))
// serialization is the process of grabbing info from a certain session in db
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

passport.use(new JWTStrategy({
  // config info
  // tokens are on the Header
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
}, ({ id }, cb) => User.findById(id)
  .populate('items') // NOT BOILERPLATE -- related to Models/Routes
  .then(user => cb(null, user))
  .catch(err => cb(err))))

// END BOILERPLATE

app.use(require('./routes'))

require('./db')
  .then(() => app.listen(3000))
  .catch(err => console.log(err))
