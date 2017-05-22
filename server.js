const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const app = express();
const DB_URL = process.env.MONGOLAB_URI || 'mongodb://avojfb:avetikharut2000@ds137230.mlab.com:37230/counters-app';
const port = 1337;
const db = require('./db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join('dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.post('/api/counter', (req, res) => {
  const counter = {
    title: req.body.title,
    value: req.body.value
  };
  db.get().collection('counters').insert(counter, (err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(counter);
  })
});

app.put('/api/counter/:id/increment/:value', (req, res) => {
  if (isNaN(Number(req.params.value))) {
    return res.sendStatus(500);
  }
  db.get().collection('counters').updateOne(
    { _id: ObjectID(req.params.id) },
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
  db.get().collection('counters').updateOne(
    { _id: ObjectID(req.params.id) },
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
  db.get().collection('counters').deleteOne(
    { _id: ObjectID(req.params.id) },
    (err, result) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      res.send(result);
    }
  )
});

app.get('/api/counters', (req, res) => {
  db.get().collection('counters').find().toArray((err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500)
    }
    res.send(result);
  })
});

app.set('port', port);

const server = http.createServer(app);

db.connect(DB_URL, (err) => {
  if (err) {
    console.log(err);
  }
  server.listen(port, () => console.log(`Listening on port ${port}`))
});