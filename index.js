const express = require('express')
const profile = require("./routes/profile.routes.js")
const trip = require("./routes/trip.routes.js")
const { con } = require("./models/conn.db.js");
const multer = require('multer');
const fs = require('fs')
const bodyParser = require('body-parser');

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(express.static('public'));
app.use('/media', express.static(__dirname + '/media'));

app.use('/api/profile', profile)
app.use('/api/trip', trip)

app.get('/', function(req, res) {
    res.send("Hello World")
})

app.listen(port, function() {
    console.log("Connected!");
    console.log('listening on 3000')
})

