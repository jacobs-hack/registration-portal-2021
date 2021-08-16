const express = require('express');
const router = express.Router();
const mongooseModel = require('../model/RegistrationModel');

router.post('/signup', (request, response) => {
    const signedUpUser = new mongooseModel({
        fullName: request.body.fullName
    })
    signedUpUser.save()
        .then(data => {
            response.json(data)
        })
        .catch(error => {
            response.json(error)
        })
})

//testing the router
router.get('/test', (req, res) => res.send('This is a test!'));

module.exports = router;