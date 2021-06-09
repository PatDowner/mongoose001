// replace "todo_db" with whatever the name of your database is
module.exports = require('mongoose').connect('mongodb://localhost/todo_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
