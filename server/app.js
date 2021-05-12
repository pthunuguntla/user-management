const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const path = require('path');


app.use(cors());


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    },
});
const upload = multer({ storage: storage });


require('dotenv').config();

const port = process.env.port || 7070;

// Configuring the database
const dbConfig = require('./config/mogodb.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Successfully connected to MongoDB.");
    }).catch(err => {
        console.log('Could not connect to MongoDB.');
        process.exit();
    });

require('./routes/user.router.js')(app, upload);


app.listen(port, (err) => {
    if (!err) {
        console.log('Listening to port', port)
    } else {
        console.log('Error')
    }
})

