var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var port = 3000;
var cors = require('cors');

var MONGODB_URI = 'mongodb://<dbuser>:<dbpassword>@ds259250.mlab.com:59250/heroku_2l8tv4vc';


// Mongoose connection with mongodb
mongoose.Promise = require('bluebird');
mongoose.connect(MONGODB_URI)
    .then(() => { // if all is ok we will be here
        console.log('Start');
    })
    .catch(err => { // if error we will be here
        console.error('App starting error:', err.stack);
        process.exit(1);
    });

// Required application specific custom router module
var routes = require('./src/router/routes');

// Use middlewares to set view engine and post json data to the server
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', routes);

// Start the server
app.listen(port, function() {
    console.log('Server is running on Port: ', port);
});

module.exports = app;