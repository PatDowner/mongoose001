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
  },
  // this adds relationship to the users...this allows one directional request. Can request items and see who the user is, but with this alone, cannot request the user and see their items just yet. Have to do similar thing in the user. -- You also have to make small change to routes.
  user: {
    type: Schema.Types.ObjectId,
    // This has to match the model name you gave it in the module.exports of the appropriate model file (user.js in this case)
    ref: 'User'
  }
}, { timestamps: true })

module.exports = model('Item', Item)
