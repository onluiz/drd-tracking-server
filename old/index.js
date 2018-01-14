// const express = require('express'),
//   app = express(),
//   cookieParser = require('cookie-parser'),
//   PORT = process.env.PORT || 5000,
//   path = require('path'),
//   cookies = require('./cookies'),
//   customCors = require('./configs/customCors'),
//   bodyParser = require('body-parser')
const expressConfig = require('./configs/express')
  mongoConfig = require('./configs/mongo'),
  
expressConfig()
mongoConfig()
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.use(customCors.allow)
// app.use(cookieParser());
// app.use('/', express.static(path.join(__dirname, 'public')))

/**
 * COOKIES
 * ---------------------------------
 * ---------------------------------
 */
// app.get('/cookies', (req, res) => {
  // res.json({cookies: req.cookies[COOKIE_NAME]})
// })

// app.get('/clear', function(req,res){
  // res.clearCookie(cookies.COOKIE_NAME).send('Cookie deleted');
// });

// require('./routes/')(app)

// app.post('/cookie', (req, res) => {
//   let cookieName = cookies.COOKIE_NAME
//   let cookie = cookies.data(req)
//   let expireTime = cookies.expireTime()

//   console.log('/cookie', cookie)

//   res.cookie(cookieName, cookie, expireTime).send(cookie)
// })

// /**
//  * CONTACTS
//  * ---------------------------------
//  * ---------------------------------
//  */
// const mongoose = require('mongoose'),
//   Contact = mongoose.model('Contact'),
//   Page = mongoose.model('Page')

// app.get('/contacts', (req, res) => {
//   Contact.find({}, function(err, obj) {
//     if (err) res.send(err);
//     res.json(obj);
//   });
// })

// app.post('/contacts', (req, res) => {
//   var contact = new Contact(req.body);
//   console.log('create', contact);
//   contact.save(function(err, obj) {
//       if (err)
//           res.send(err);
//       console.log('after create', obj);
//       res.json(obj);
//   });
// })

// app.listen(PORT, () => console.log(`Listening on ${ PORT }`))