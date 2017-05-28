const mongoose = require('mongoose');

// Counter Schema
const CounterSchema = mongoose.Schema({
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String
  },
  value: {
    type: Number,
    default: 0
  }
});

const Counter = module.exports = mongoose.model('Counter', CounterSchema);

module.exports.createCounter = (counter, cb) => {
  Counter.create(counter, cb);
};

module.exports.findCountersByOwnerId = (owner_id, cb) => {
  Counter.find( {owner_id}, cb);
};

module.exports.findCounterByIdAndIncrement = (id, owner_id, value, cb) => {
  Counter.findOneAndUpdate(
    { _id: id, owner_id },
    { $inc: { value } },
    { new: true },
    cb
  )
};

module.exports.findCounterByIdAndDecrement = (id, owner_id, value, cb) => {
  Counter.findOneAndUpdate(
    { _id: id, owner_id },
    { $inc: { value: -value } },
    { new: true },
    cb
  )
};

module.exports.removeCounter = (id, owner_id, cb) => {
  Counter.findOneAndRemove(
    { _id: id, owner_id },
    cb
  )
};
