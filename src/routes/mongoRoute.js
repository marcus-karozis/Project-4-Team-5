
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Connect to MongoDB server using environment variables
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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
                    users_selected:[String],
                    users_passed:[String]
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
            class: Number,
            checkin_timestamps:[Date]
        }
    ]
});

// Define the models for the collections
const Subject = mongoose.model('Subject', subjectSchema);
const User = mongoose.model('User', userSchema);

// Get Requests

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

// Post Requests

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
