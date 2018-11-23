const mongoose = require('mongoose');

//database model
const exercises = mongoose.model('exercises', {
    title: String,
    description: String,
    muscles: String
})

module.exports = exercises;

