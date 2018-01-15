module.exports = function (app) {
  require('./cookies')(app)
  require('./contacts')(app)
};