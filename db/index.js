//this file is responsible for the db connection is disconnection
const mongoose = require('mongoose');

//connects to db
const connect = () => {
  return new Promise((resolve, reject) => {

    //if we want to connect for a test, use mock connection
    if (process.env.NODE_ENV === 'test') {
      const Mockgoose = require('mockgoose').Mockgoose;
      const mockgoose = new Mockgoose(mongoose);

      mockgoose.prepareStorage()
        .then(() => {
          mongoose.connect(process.env.DB_CONNECTION)
            .then((res, err) => {
              //if there is an error, reject the promise, otherwise resolve it
              if (err) return reject(err);
              resolve();
            })
        })
    }
    //if we want to connect for production 
    else {
        mongoose.connect(process.env.DB_CONNECTION)
          .then((res, err) => {
            if (err) return reject(err);
            resolve();
          })
    }
  });
}

const close = () => {
  return mongoose.disconnect();
}

module.exports = { connect, close };