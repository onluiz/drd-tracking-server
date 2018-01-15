module.exports = () => {
  var mongoose = require('mongoose');
  mongoose.Promise = global.Promise;
  // mongoose.connect('mongodb://localhost/drdtrackingdb4', {useMongoClient: true});
  mongoose.connect('mongodb://rd:17231723@ds157057.mlab.com:57057/heroku_2z8xvtrx', {useMongoClient: true});
  //mongodb://heroku_2z8xvtrx:itachi312@ds157057.mlab.com:57057/heroku_2z8xvtrx

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
      console.log('we are connected!');
  });
  let Track2 = require('../trackModel')
};