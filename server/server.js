const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const users = require('./routes/users');
const config = require('./config/db');
const Counter = require('./models/counter');

const port = 1337;
const app = express();

mongoose.connect(config.database);

const connection = mongoose.connection;

connection.on('connected', () => {
  console.log(`Connected to: ${config.database}`)
});

connection.on('error', (err) => {
  console.log(`Database error: ${err}`)
});

// Server static files
app.use(express.static(path.join('dist')));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Users API
app.use('/api/users', users);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.get('/api/counters', (req, res) => {
  Counter.find({}, (err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500)
    }
    res.send(result);
  })
});

app.post('/api/counter', (req, res) => {
  const counter = {
    title: req.body.title,
    value: req.body.value
  };
  Counter.create(counter, (err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(result);
  })
});

app.put('/api/counter/:id/increment/:value', (req, res) => {
  if (isNaN(Number(req.params.value))) {
    return res.sendStatus(500);
  }
  Counter.findOneAndUpdate(
    { _id: req.params.id },
    { $inc: { value: Number(req.params.value) || 1 } },
    (err, result) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      res.send(result);
    }
  )
});

app.put('/api/counter/:id/decrement/:value', (req, res) => {
  if (isNaN(Number(req.params.value))) {
    return res.sendStatus(500);
  }
  Counter.findOneAndUpdate(
    { _id: req.params.id },
    { $inc: { value: -Number(req.params.value) || -1 } },
    (err, result) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      res.send(result);
    }
  )
});

app.delete('/api/counter/:id', (req, res) => {
  Counter.findOneAndRemove(
    { _id: req.params.id },
    (err, result) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      res.send(result);
    }
  )
});
