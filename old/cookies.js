const uuidv4 = require('uuid/v4');
const COOKIE_NAME = '_server.cookie'

exports.COOKIE_NAME = COOKIE_NAME

exports.data = (req) => {
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
exports.expireTime = () => {
  return {maxAge: 900000}
}