module.exports = function(app) {
  const uuidv4 = require('uuid/v4'),
    COOKIE_NAME = '_server.cookie',
    Track = require('./trackModel')

  app.route('/cookies')
    .get(function(req, res) {
      Track.find({}).sort("-created_datetime").exec((err, obj) => {
        if (err)
            res.send(err);
        res.json(obj);
      });
    })

    .post(function(req, res) {
      const sendCookie = (res, obj) => {
        res.cookie(COOKIE_NAME, JSON.stringify(obj), {maxAge: 900000, expires: 900000})
        res.send(obj)
      }

      let cookieReq = JSON.parse(req.body.data)
      if(cookieReq.uuid === undefined) {
        cookieReq.uuid = uuidv4()
      }

      if(cookieReq._id !== undefined) {
        return Track.findById(cookieReq._id, function(err, obj) {
          if(err) {
            return console.log(err)
          } 
          obj.set(cookieReq)
          obj.save(function(err, obj) {
            if(err) {
              return console.log(err)
            }
            sendCookie(res, obj)
          })
        })
      }

      let trackObj = new Track(cookieReq)
      trackObj.save((err, obj) => {
        sendCookie(res, obj)
      })
    })
}