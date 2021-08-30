const express = require('express');
const router = express.Router();
const mongooseModel = require('../model/RegistrationModel');

router.post('/signup', (request, response) => {
    const signedUpUser = new mongooseModel({
        fullname: request.body.fullname,
        birthday: request.body.birthday,
        gender: request.body.gender,
        pronouns: request.body.pronouns,
        nationality: request.body.nationality,
        ethnicity: request.body.ethnicity,
        onCampus: request.body.onCampus,
        college: request.body.college,
        room: request.body.room,
        street: request.body.street,
        zip: request.body.zip,
        city: request.body.city,
        country: request.body.country,
        email: request.body.email,
        phone: request.body.phone,
        university: request.body.university,
        degree: request.body.degree,
        major: request.body.major,
        gradYear: request.body.gradYear,
        exp: request.body.exp,
        prevHack: request.body.prevHack,
        whyApply: request.body.whyApply,
        drive: request.body.drive,
        creativity: request.body.creativity,
        role: request.body.role,
        strength: request.body.strength,
        weakness: request.body.weakness,
        built: request.body.built,
        achieve: request.body.achieve,
        partTeam: request.body.partTeam,
        team: request.body.team,
        teamMembers: request.body.teamMembers,
        diet: request.body.diet,
        tshirt: request.body.tshirt,
        needs: request.body.needs,
        questions: request.body.questions,
        hear: request.body.hear,
        linkedin: request.body.linkedin,
        github: request.body.github,
        terms: request.body.terms,
        mlh: request.body.mlh,
        privacy: request.body.privacy,
        messages: request.body.messages,

    })
    signedUpUser.save()
        .then(data => {
            console.log("Data saved on the database!")
            response.json(data)
        })
        .catch(error => {
            response.sendStatus(404)
            response.json(error)
        })
})

//testing the router
router.get('/test', (req, res) => res.send('This is a test!'));

module.exports = router;