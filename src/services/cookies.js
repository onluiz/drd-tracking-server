const uuidv4 = require('uuid/v4'),
  COOKIE_NAME = '_server.cookie'

exports.listAll = (req, res) => {
  res.json({cookies: req.cookies})
}

exports.create = (req, res) => {
  let cookie = cookieData(req)
  res.cookie(COOKIE_NAME, cookie, {maxAge: 900000})
  res.send(cookie)
}

exports.clear = (req, res) => {
  res.clearCookie(COOKIE_NAME).send('Cookie deleted');
}

const cookieData = (req) => {
  /**
   * IF no cookies were sent by cliente
   * THEN create a new cookie @func createCookie
   * https://stackoverflow.com/a/16209531/3384831
   */
  let cookie = req.cookies[COOKIE_NAME]
  if(cookie === undefined) {
    return createCookie(req)
  }

  /**
   * If there already is a valid cookie
   * THEN just returns it to the cliente
   */
  return cookie
}

/**
 * Creates a new cookie
 * id - > A unique universal identifier (uuid) created by uuid lib
 * creation_time -> Cookie creation time
 * http://shipit.resultadosdigitais.com.br/blog/compartilhando-cookies-entre-dominios/
 */
const createCookie = (req) => {
  return JSON.stringify({
    id: uuidv4(), 
    creation_time: new Date(),
    url: req.headers.origin
  })
}

/**
 * Generates a expiration time to be used in a new cookie
 * https://www.codementor.io/noddy/cookie-management-in-express-js-du107rmna
 */
const expireTime = () => {
  return {maxAge: 900000}
}