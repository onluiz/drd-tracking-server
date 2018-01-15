module.exports = () => {
  var mongoose = require('mongoose');
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost/drdtrackingdb', {useMongoClient: true});

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
      console.log('we are connected!');
  });
  let Track2 = require('../trackModel')
};