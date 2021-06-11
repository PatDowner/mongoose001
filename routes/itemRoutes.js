const router = require('express').Router()
const { Item, User } = require('../models')

// GET all
router.get('/items', (req, res) => {
  // Item.find({ text: 'Take out trash' })
  Item.find()
    // this will fill in data from another data type. To do this, pass it the name of the property on the data. Basically, this will allow it to show all the user's data, looked up by that user ID, instead of only the id.
    .populate('user')
    // find the items, receive them, and send (res) them back
    .then(items => res.json(items))
    .catch(err => console.log(err))
})

// POST one
router.post('/items', (req, res) => {
  Item.create(req.body)
    // take the item we created and hand it back to the front end
    .then(item => {
      // need to tell it to send the id of the item to the user's items array
      User.findByIdAndUpdate(item.user, { $push: { items: item._id } })
        .then(() => res.json(item))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

// PUT (update) one
router.put('/items/:id', (req, res) => {
  Item.findByIdAndUpdate(req.params.id, req.body)
    // it doesn't send any data back, so just send status "ok"
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

// DELTE one
router.delete('/items/:id', (req, res) => {
  Item.findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

module.exports = router
