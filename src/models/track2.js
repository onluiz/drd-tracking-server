const mongoose = require('mongoose')

const Track2 = mongoose.Schema({
    uuid: String,
    email: String,
    host: String,
    created_datetime: Date,
    pages: [{
      path: String,
      logs: [{
        server_datetime: {type: Date, default: Date.now},
        client_datetime: Date
      }]
    }]
});

module.exports = mongoose.model('Track2', Track2);