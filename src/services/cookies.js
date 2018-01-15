const uuidv4 = require('uuid/v4'),
  mongoose = require('mongoose'),
  Contact = mongoose.model('Contact'),
  COOKIE_NAME = '_server.cookie',
  COOKIE_CLIENT_NAME = '_client.cookie'

exports.listAll = (req, res) => {
  let cookieJson = req.cookies[COOKIE_NAME];
  let cookieObj
  if(cookieJson !== undefined) {
    cookieObj = JSON.parse(cookieJson)
  }
  res.json(cookieObj || {message: 'No Cookies Found'})
}

exports.clear = (req, res) => {
  res.clearCookie(COOKIE_NAME)
  res.clearCookie(COOKIE_CLIENT_NAME)
  res.send('Cookie deleted');
}

exports.create = (req, res) => {
  const sendCookie = function(cookie) {
    res.cookie(COOKIE_NAME, JSON.stringify(cookie), {maxAge: 900000})
    res.send(cookie)
  }

  const createUpdateContact = (req, err, obj) => {
    if(err || obj === null) {
      return createContact(req, function(cookie) {
        sendCookie(cookie)
      })
    } 

    return updateContact(req, obj, function(cookie) {
      sendCookie(cookie)
    })
  }

  let email = req.body.email
  if(email !== undefined) {
    return Contact.findOne({email: email}, function(err, obj) {
      createUpdateContact(req, err, obj)
    })
  }

  let cookie = cookieData(req)
  sendCookie(cookie)
}

const cookieData = (req) => {
  /**
   * If no cookies were sent by cliente
   * then create a new cookie @func createCookie
   * https://stackoverflow.com/a/16209531/3384831
   */
  let cookie = req.cookies[COOKIE_NAME]
  if(cookie === undefined) {
    return prepareContact(req)
  }

  /**
   * If there already is a valid cookie
   * then just returns it to the cliente
   */
  return updateCookie(req, JSON.parse(cookie))
}

/**
 * Creates a new cookie
 * id - > A unique universal identifier (uuid) created by uuid lib
 * creation_time -> Cookie creation time
 * http://shipit.resultadosdigitais.com.br/blog/compartilhando-cookies-entre-dominios/
 */
// const createCookie = (req) => {
//   return {
//     _id: req.body.contactId || null,
//     email: req.body.email || null,
//     created_datetime: new Date(),
//     track: {
//       _id: req.body.trackId || null,
//       uuid: uuidv4(),
//       url: req.headers.origin,
//       created_datetime: new Date(),
//       pages: [
//         {
//           _id: req.body.pageId || null,
//           path: req.body.path,
//           logs: [{created_datetime: new Date()}]
//         }
//       ]
//     }
//   }
// }

const createContact = (req, callback) => {
  let contact = prepareContact(req)
  let contactObj = new Contact(contact)
  contactObj.save(function(err, obj) {
    callback(obj)
  })
}

const updateContact = (req, obj, callback) => {
  
}

/** Sem _id */
const prepareContact = (req) => {
  return {
    email: req.body.email,
    created_datetime: new Date(),
    tracks: [
      {
        uuid: uuidv4(),
        url: req.headers.origin,
        created_datetime: new Date(),
        pages: [
          {
            path: req.body.path,
            logs: [{created_datetime: new Date()}]
          }
        ]
      }
    ]
  }
}

const updateCookie = (req, cookie) => {
  cookie.email = req.body.email || cookie.email

  let newPage = true
  for(page of cookie.track.pages) {
    if(page.path === req.body.path) {
      page.logs.push({created_datetime: new Date()})
      newPage = false
      break
    }
  }

  if(newPage) {
    cookie.track.pages.push({
      path: req.body.path,
      logs: [{created_datetime: new Date()}]
    })
  }

  return cookie
}