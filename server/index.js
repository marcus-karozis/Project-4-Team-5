require('dotenv').config();

const path = require("path");
const express = require("express");
const app = express(); // create express app

const mongoRouter = require('./routes/mongoRoute');

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.use(express.json()); // For JSON request bodies
app.use(express.urlencoded({ extended: true })); // For URL-encoded request bodies

// Define a route to execute the Python script
app.post('/run-python-script', (req, res) => {
    // Run the Python script as a subprocess
    const pythonProcess = exec('python auther.py', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing auther.py: ${error}`);
            res.status(500).send('Error executing Python script');
            return;
        }
        console.log(`Python script output: ${stdout}`);
        res.send('Python script executed successfully');
    });
});

// app.get("/", (req, res) => {
//   res.send("This is from express.js");
// });

app.use('/db', mongoRouter);

// handle react app routing
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

// start express server on port 5000
app.listen(process.env.SERVER_PORT, () => {
  console.log("server started on port " + process.env.SERVER_PORT);
});
