const router = require('express').Router()
const { Item } = require('../models')

// GET all
router.get('/items', (req, res) => {
  // Item.find({ text: 'Take out trash' })
  Item.find()
    // find the items, receive them, and send (res) them back
    .then(items => res.json(items))
    .catch(err => console.log(err))
})

// POST one
router.post('/items', (req, res) => {
  Item.create(req.body)
    // take the item we created and hand it back to the front end
    .then(item => res.json(item))
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
