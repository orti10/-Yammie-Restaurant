const express = require ('express');
const router = express.Router();
const Order = require('../db/models/order.model');

router.get('/',async (req, res) => {
  try {
    //the .populate means that the response would replace the item Numbers
    //with the whole item object
    const orders = await Order.find().populate('items.item');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

//defining what happend with a get request to 'orders/date/today'
router.get('/date/today', async (req, res) => {
  try {
    const todayOrders = await Order.find({"date": { 
      //finding all orders with a date less then the date now, and more then
      //the date yesterday (at this)
      $lt: new Date(), 
      $gte: new Date(new Date().setDate(new Date().getDate()-1))
    }}).populate('items.item');
    res.status(200).json(todayOrders);
  } catch (err) {
    res.status(500).json({message: err});
  }
});

router.post('/', async (req, res) => {
  const order = new Order({
    items: req.body.items,
    date: req.body.date
  });

  try {
    const savedOrder = await order.save();
    res.status(200).json(savedOrder);
  } catch(err) {
    res.status(500).json({ message: err});
  };
});

router.delete('/',async (req, res) => {
  try {
    const deletedOrders = await Order.deleteMany();
    res.status(200).json(deletedOrders);
  } catch (err) {
    res.status(500).json({ message: err});
  }
})

module.exports = router;