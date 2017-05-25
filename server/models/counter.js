const mongoose = require('mongoose');

// Counter Schema
const CounterSchema = mongoose.Schema({
  title: {
    type: String
  },
  value: {
    type: Number
  }
});

const Counter = module.exports = mongoose.model('Counter', CounterSchema);
