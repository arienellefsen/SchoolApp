var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var port = 3000;
var cors = require('cors');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var logger = require('morgan');
var path = require("path");

require('./passport')(passport);

var auth = require('./src/router/auth')(passport);

// Mongoose connection with mongodb
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://admin:aladim2018@ds018168.mlab.com:18168/school-project-api')
    .then(() => { // if all is ok we will be here
        console.log('Start');
    })
    .catch(err => { // if error we will be here
        console.error('App starting error:', err.stack);
        process.exit(1);
    });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Required application specific custom router module
var routes = require('./src/router/routes');
var unidades = require('./src/router/unidades');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'thesecret',
    saveUninitialized: false,
    resave: false
}))

// Use middlewares to set view engine and post json data to the server

app.use(passport.initialize())
app.use(passport.session())
app.use('/', routes);
app.use('/unidades', unidades);
app.use('/auth', auth);

// Start the server
app.listen(port, () => {
    console.log('Server is running on Port: ', port);
});

module.exports = app;