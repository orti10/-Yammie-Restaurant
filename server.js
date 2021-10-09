// this is the satarting file of the program, it connects to the db, and starts the server
const express = require('express');
const app = require('./app');
const db = require('./db/index');
require('dotenv/config');

//if process.enc.PORT in the .env file is defined, use that. if not, use default value 3000
const PORT = process.env.PORT || 3000;

//first connect to the db, then start server, and output message to console
db.connect()
.then(() => {
  app.listen(PORT, () => {
    console.log('Listening on port: ' + PORT);
  });
});