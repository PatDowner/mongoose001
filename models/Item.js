const { model, Schema } = require('mongoose')

// note: Schema is the layout of the data, model is the thing that gets put into the data

const Item = new Schema({
  // the text of the to-do item
  text: {
    type: String,
    unique: true,
    required: true
  },
  // to track if it's done or not
  isDone: {
    type: Boolean,
    required: true
  }
})

module.exports = model('Item', Item)
