const mongoose = require('mongoose')

const Contact = mongoose.Schema({
    email: String,
    created_datetime: {
        type: Date,
        default: Date.now
    },
    tracks: [
        {
            uuid: String,
            url: String,
            created_datetime: Date,
            pages: [
                {
                    path: String,
                    logs: [
                        {
                            created_datetime: Date
                        }
                    ]
                }
            ]
        }
    ]
});

module.exports = mongoose.model('Contact', Contact);