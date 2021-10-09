const express = require('express');
const router = express();
//import the item schema, further explenation in the order schema file
const Item = require('../db/models/item.model');

// difinning what happnes for a get request at the base route of the items
// (it would be '/items')
router.get('/', async (req, res) => {
  try {
    //find all items
    const items = await Item.find();
    //respond to the request with the items
    res.status(200).json(items);
  } catch (err) {
    //respond with the error message
    res.status(500).json({message: err});
  }
});

//defining what happend with a post request to '/itmes'
router.post('/',async (req, res) => {
  //creating a new item object with the request body
  const item = new Item({
    _id: req.body._id,
    name: req.body.name,
    price: req.body.price
  });

  try{
    //saving the new object to the DB
    const savedItem = await item.save();
    res.status(200).json(savedItem);
  } catch(err) {
    res.status(500).json({message: err});
  }
});

module.exports = router;