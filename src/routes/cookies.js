module.exports = function(app) {

  const cookies = require('../services/cookies')

  app.route('/cookies')
    .get((cookies.listAll))
    .post(cookies.create);

  app.route('/cookies/clear')
    .get(cookies.clear)
    
};