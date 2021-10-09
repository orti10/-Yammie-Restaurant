//this app is responsible for adding middlewares to the router
const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv/config');

//import routes
const orderRoutes = require('./routes/orders.route');
const itemRoutes = require('./routes/items.route');

//middlwares

//this middlware enables the express router to handle post requests with a json body
app.use(express.json());

//specifing we want all request to /orders handled with the orderRoutes file, same for items
app.use('/orders', orderRoutes);
app.use('/items', itemRoutes);

//routes
app.get('/', (req, res) => {
  res.send('Welcome to the yammie resturant api');
});

module.exports = app;