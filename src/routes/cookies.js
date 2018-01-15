module.exports = function(app) {
  
  const cookies = require('../services/cookies')
  const uuidv4 = require('uuid/v4')
  const COOKIE_NAME = '_server.cookie'
  const Track2 = require('../models/track2')

  app.route('/cookies')
    .get(function(req, res) {
      Track2
      .find({})
      .sort("-created_datetime")
      .exec((err, obj) => {
        if (err)
            res.send(err);
        res.json(obj);
      });
    })

    .post(function(req, res) {

      let cookieReq = JSON.parse(req.body.data)

      console.log('cookieReq', cookieReq)

      if(cookieReq.uuid === undefined) {
        cookieReq.uuid = uuidv4()
      }

      if(cookieReq._id !== undefined) {
        return Track2.findById(cookieReq._id, function(err, obj) {
          if(err) {
            console.log('Update err ->', err)
          }
          obj.set(cookieReq)
          obj.save(function(err, obj) {
            if(err) {
              console.log('Update Save err ->', err)
            }

            console.log('Obj Update Save-> ', obj)
            res.cookie('_server.cookie', JSON.stringify(obj), {maxAge: 900000, expires: 900000})
            res.send(obj)
          })
        })
      }

      let track2Obj = new Track2(cookieReq)
      track2Obj.save((err, obj) => {
        res.cookie('_server.cookie', JSON.stringify(obj), {maxAge: 900000, expires: 900000})
        console.log('Obj from Save -> ', obj)
        res.send(obj)
      })
    })

  app.route('/cookies/clear')
    .get(cookies.clear)
    
};