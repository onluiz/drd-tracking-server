module.exports = () => {
  var mongoose = require('mongoose');
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost/drdtrackingdb4', {useMongoClient: true});

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
      console.log('we are connected!');
  });
  let Page = require('../models/page')
  let Track = require('../models/track')
  let Contact = require('../models/contact')
  let Track2 = require('../models/track2')
};