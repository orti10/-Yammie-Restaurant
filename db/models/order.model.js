//this is the order scema, it defines how the order should look in the DB
const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({ 
  items: [{
    item: {type: Number, ref: 'items', required: true},
    amount: {
      type: Number,
      default: 1
    }
  }],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('orders', orderSchema);