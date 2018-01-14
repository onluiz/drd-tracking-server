const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Track = Schema({
  access_time: Date, 
  pages: [{
      type: Schema.ObjectId, ref: 'Page'
  }]
});

module.exports = mongoose.model('Track', Track);