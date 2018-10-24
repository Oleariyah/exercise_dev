const mongoose = require('mongoose');

//database model
const Todo = mongoose.model('Todo', {
    text: String,
    complete: Boolean
})

module.exports = Todo;

