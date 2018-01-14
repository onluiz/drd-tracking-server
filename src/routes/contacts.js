module.exports = (app) => {
  
  const contacts = require('../services/contacts')

  app.route('/contacts')
    .get((contacts.listAll))
    .post(contacts.create);

  app.route('/contacts/:id')
    .get(contacts.findById)
    
};