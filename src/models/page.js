const mongoose = require('mongoose');

const Page = mongoose.Schema({ description: String, access_datetime: Date });

module.exports = mongoose.model('Page', Page);