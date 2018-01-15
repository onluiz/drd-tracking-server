const mongoose = require('mongoose');

const Page = mongoose.Schema({ path: String, logs: [] });

module.exports = mongoose.model('Page', Page);