const express = require('express');
const app = express();
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
const port = process.env.PORT || 4000;
const url = process.env.DATABASE_ACCESS;

//connecting to database
mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log('Database connected!'))
    .catch(error => console.log('Failed to connect to MongoDB!', error))

//listening on a port 
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

//router
app.get('/', (req, res) => res.send('Hello World!'));