module.exports = () => {
  const express = require('express'),
    app = express(),
    cookieParser = require('cookie-parser'),
    PORT = process.env.PORT || 5001,
    path = require('path'),
    customCors = require('./customCors'),
    bodyParser = require('body-parser')

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use(customCors.allow)
  app.use(cookieParser());
  app.use('/', express.static(path.join(__dirname, '../../public')))

  /** Routes */
  require('../cookiesRoutes')(app)

  app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
}