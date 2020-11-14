const mongoose = require('mongoose')


const refereeSchema = new mongoose.Schema({
    name: String,
    age: Number,
    active: Boolean
})

module.exports = mongoose.model('Referee',refereeSchema)