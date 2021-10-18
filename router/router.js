const express = require('express');
    router = express.Router();
    mongooseModel = require('../model/RegistrationModel');
    multer = require('multer');
    path = require('path')

const { v4: uuidv4 } = require('uuid');

//storing our pdf file inside public folder
const DIR = './public';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "application/pdf") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .pdf format allowed!'));
        }
    }
});


//saving data to our database
router.post('/signup', upload.single('cvlink'),(req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    const signedUpUser = new mongooseModel({
        fullname: req.body.fullname,
        birthday: req.body.birthday,
        gender: req.body.gender,
        pronouns: req.body.pronouns,
        nationality: req.body.nationality,
        ethnicity: req.body.ethnicity,
        onCampus: req.body.onCampus,
        college: req.body.college,
        room: req.body.room,
        street: req.body.street,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
        email: req.body.email,
        phone: req.body.phone,
        university: req.body.university,
        degree: req.body.degree,
        major: req.body.major,
        gradYear: req.body.gradYear,
        exp: req.body.exp,
        prevHack: req.body.prevHack,
        whyApply: req.body.whyApply,
        drive: req.body.drive,
        creativity: req.body.creativity,
        role: req.body.role,
        strength: req.body.strength,
        weakness: req.body.weakness,
        built: req.body.built,
        achieve: req.body.achieve,
        partTeam: req.body.partTeam,
        team: req.body.team,
        teamMembers: req.body.teamMembers,
        diet: req.body.diet,
        tshirt: req.body.tshirt,
        needs: req.body.needs,
        questions: req.body.questions,
        linkedin: req.body.linkedin,
        github: req.body.github,
        cvlink: url + '/public/' + req.file.filename,
        terms: req.body.terms,
        mlh: req.body.mlh,
        privacy: req.body.privacy,

    })
    signedUpUser.save()
        .then(result => {
            console.log("Data saved on the database!")
            res.sendStatus(201);
        })
        .catch(error => {
            console.log(error);
            res.sendStatus(500);
        })
})

// //getting data from our database
// router.get("/data", (req, res, next) => {
//     signedUpUser.find().then(data => {
//         res.status(200).json({
//             message: "User data retrieved successfully!",
//             data: data,
//         });
//     });
// });

module.exports = router;