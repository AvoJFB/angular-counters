const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config/db');
const Counter = require('../models/counter');

// Get Counters
router.get('/counters', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  Counter.findCountersByOwnerId(req.user.id, (err, counters) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    if (!counters) {
      return res.json({
        success: false,
        message: 'No counters for you('
      })
    }
    res.json({
      success: true,
      counters,
    })
  })
});

// Create Counter
router.post('/counter', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  const counter = {
    owner_id: req.user._id,
    title: req.body.title,
    value: req.body.value
  };
  Counter.createCounter(counter, (err, counter) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.json({
      success: true,
      counter
    });
  })
});

// Increment Counter
router.put('/counter/:id/increment/:value', passport.authenticate('jwt', {session: false}), (req, res) => {
  if (isNaN(Number(req.params.value))) {
    return res.sendStatus(500);
  }
  Counter.findCounterByIdAndIncrement(req.params.id, req.user._id, req.params.value, (err, counter) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    if (!counter) {
      return res.json({
        success: false,
        message: 'Error'
      })
    }
    res.json({
      success: true,
      counter,
    })
  })
});

// Decrement Counter
router.put('/counter/:id/decrement/:value', passport.authenticate('jwt', {session: false}), (req, res) => {
  if (isNaN(Number(req.params.value))) {
    return res.sendStatus(500);
  }
  Counter.findCounterByIdAndDecrement(req.params.id, req.user._id, req.params.value, (err, counter) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    if (!counter) {
      return res.json({
        success: false,
        message: 'Error'
      })
    }
    res.json({
      success: true,
      counter,
    })
  })
});

// Delete Counter
router.delete('/counter/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Counter.removeCounter(req.params.id, req.user._id, (err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.json({
      success: true,
      message: 'Counter removed successfully'
    });
  })
});

module.exports = router;