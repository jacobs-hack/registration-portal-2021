const mongoose = require('mongoose')

const signUpTemplate = new mongoose.Schema({
    fullName: String,
    date: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('RegistrationTable', signUpTemplate);