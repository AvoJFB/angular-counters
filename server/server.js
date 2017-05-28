const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const users = require('./routes/users');
const counters = require('./routes/counters');
const config = require('./config/db');

const port = process.env.PORT || 8080;
const app = express();

mongoose.connect(config.database);

const connection = mongoose.connection;

connection.on('connected', () => {
  console.log(`Connected to: ${config.database}`)
});

connection.on('error', (err) => {
  console.log(`Database error: ${err}`)
});

// Serve static files
app.use(express.static(path.join('dist')));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Users API
app.use('/api', users);
app.use('/api', counters);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});
