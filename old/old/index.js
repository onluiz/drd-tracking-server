const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const ejs = require('ejs')
const uuidv4 = require('uuid/v4');
const PORT = process.env.PORT || 5000
const cookies = require('./cookies')

function allowCrossDomain(req,res,next) {  
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,X-Requested-With');

  if (req.method!='OPTIONS') return next();

  res.send(204);
}  

app.use(allowCrossDomain)
app.use(cookieParser());
app.engine('html', require('ejs').renderFile)

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/pages/index.html')
})

app.get('/cookies', (req, res) => {
  res.json({cookies: req.cookies[COOKIE_NAME]})
})

app.get('/clear', function(req,res){
  res.clearCookie(cookies.COOKIE_NAME);
  res.send('Cookie deleted');
});

app.post('/cookie', (req, res) => {
  let cookie = cookies.data(req)
  let cookieExpireTime = {expire : new Date() + 9999}

  console.log('POST COOKIE')
  console.log('cookie', cookie)
  console.log('cookieExpireTime', cookieExpireTime)
  console.log('req.headers.origin', req.headers.origin)

  res.cookie(cookies.COOKIE_NAME, cookie, {maxAge: 900000})
  res.send(cookie)
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

const COOKIE_NAME = '_server.cookie'

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
const cookieExpireTime = () => {
  return {expire : new Date() + 9999}
}