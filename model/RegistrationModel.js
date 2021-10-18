const mongoose = require('mongoose');

const signUpTemplate = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    pronouns: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    ethnicity: {
        type: String,
        required: true
    },
    onCampus: {
        type: Boolean,
        required: true
    },
    college: String,
    room: String,
    street: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: String,
    university: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    major: {
        type: String,
        required: true
    },
    gradYear: {
        type: String,
        required: true
    },
    exp: Boolean,
    prevHack: String,
    whyApply: {
        type: String,
        required: true
    },
    drive: String,
    creativity: String,
    role: {
        type: String,
        required: true
    },
    strength: String,
    weakness: String,
    built: String,
    achieve: {
        type: String,
        required: true
    },
    partTeam: {
        type: String,
        required: true
    },
    team: {
        type: Boolean,
        required: true
    },
    teamMembers: String,
    diet: {
        type: String,
        required: true
    },
    tshirt: {
        type: String,
        required: true
    },
    needs: String,
    questions: String,
    linkedin: String,
    github: String,
    cvlink: String,
    terms: {
        type: Boolean,
        required: true
    },
    mlh: {
        type: Boolean,
        required: true
    },
    privacy: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('registrationtables', signUpTemplate);