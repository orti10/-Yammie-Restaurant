//this is the item schema, it defines how the item should look in the DB
const mongoose = require('mongoose');

const itemsSchema = mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('items', itemsSchema);