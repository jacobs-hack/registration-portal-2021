const express = require('express');
const app = express();
const path= require("path");
const routerUrls = require('./router/router');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routeUrls = require('./router/router');
const cors = require('cors');

//using middlewares
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cors());
dotenv.config();
app.use('/api', routeUrls);

//accessing the port number
const port = process.env.PORT;
const url = process.env.DATABASE_ACCESS;

//connecting to database
mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Database connected!');
    })
    .catch(error => console.log('Failed to connect to MongoDB!', error));

//checking if we are in production or not
if (process.env.NODE_ENV==="production") {
    app.use(express.static(path.join(__dirname, "/client/build")));
    app.get("*", (req,res)=> {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
} else {
    app.get('/', (req, res) => res.send('API is running!'));
}

//listening on a port only after a connection has been made
app.listen(port, () => console.log(`Example app listening on port ${port}!`));


