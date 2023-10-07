require('dotenv').config();

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Connect to MongoDB server using environment variables
const mogoURI = "mongodb://"+
                process.env.MONGODB_USER+":"+
                process.env.MONGODB_PASS+"@"+
                process.env.MONGODB_HOST+":"+
                process.env.MONGODB_PORT;
console.log(mogoURI);
mongoose.connect(mogoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.MONGODB_DB,
});

// Check if MongoDB connection is successful
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('MongoDB connection successful!');
});

// Define the schemas for the collections
const subjectSchema = new mongoose.Schema({
    subject_name: String,
    classes: [
        {
            class_name: String,
            class_start_timestamps: [Date],
            class_end_timestamps: [Date],
            codes: [
                {
                    value: String,
                    expiry: Date,
                    users_selected:[String],    // user_name stored here
                    users_passed:[String]       // user_name stored here
                }
            ]
        }
    ]
});

const userSchema = new mongoose.Schema({
    user_type: Number,
    user_name: String,
    enrolment: [
        {
            class: Number,              //classes object index stored here
            checkin_timestamps:[Date]
        }
    ]
});

// Define the models for the collections
const Subject = mongoose.model('Subject', subjectSchema);
const User = mongoose.model('User', userSchema);

// GET Requests

// Define the GET request for the subjects collection
router.get('/subjects', async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.send(subjects);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Define the GET request for the users collection
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// POST Requests

// Define the POST request for the subjects collection
router.post('/subjects', async (req, res) => {
    try {
        const { subject_name, classes } = req.body;
        const subject = new Subject({ subject_name, classes });
        await subject.save();
        res.send(subject);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});
// Define the POST request for the users collection
router.post('/users', async (req, res) => {
    try {
        const { user_type, user_name, enrolment } = req.body;
        const user = new User({ user_type, user_name, enrolment });
        await user.save();
        res.send(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});



module.exports = router;
