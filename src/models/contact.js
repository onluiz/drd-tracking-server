const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const Contact = Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    genre: {
        type: String,
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    tracks: [{
        type: Schema.ObjectId, ref: 'Track'
    }]
});

module.exports = mongoose.model('Contact', Contact);