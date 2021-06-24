const router = require('express').Router()
const { User } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')

// // Existed pre-user-authentication
// // GET
// router.get('/users', (req, res) => {
//   User.find()
//   .populate('items')
//     .then(users => res.json(users))
//     .catch(err => console.log(err))
// })

// // POST
// router.post('/users', (req, res) => {
//   User.create(req.body)
//     .then(user => res.json(user))
//     .catch(err => console.log(err))
// })

// // PUT
// router.put('/users/:id', (req, res) => {
//   User.findByIdAndUpdate(req.params.id, req.body)
//     .then(() => res.sendStatus(200))
//     .catch(err => console.log(err))
// })

// // DELETE
// router.delete('/users/:id', (req, res) => {
//   User.findByIdAndDelete(req.params.id)
//     .then(() => res.sendStatus(200))
//     .catch(err => console.log(err))
// })

// Register Route -- make new user
router.post('/users/register', (req, res) => {
  const { name, email, username, password } = req.body
  User.register(new User({ name, email, username }), password, err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})

// Log In Route -- handle when user logs in
router.post('/users/login', (req, res) => {
  const { username, password } = req.body
  User.authenticate()(username, password, (err, user) => {
    if (err) { console.log(err) }
    // what happens when we log in.
    // if user exists, give a jwt, if not, do nothing
    res.json(user ? jwt.sign({ id: user._id }, process.env.SECRET) : null)
  })
})

// get the user and their items
router.get('/users/items', passport.authenticate('jwt'), (req, res) => {
  res.json(req.user)
})

module.exports = router
