const mongoose = require('mongoose');
  Contact = mongoose.model('Contact');

exports.findById = (req, res) => {
  Contact.findById(req.params.id, (err, obj) => {
    if (err)
        res.send(err);
    res.json(obj);
  });
}

exports.listAll = (req, res) => {
  Contact
    .find({})
    .sort("-created_date")
    .exec((err, obj) => {
      if (err)
          res.send(err);
      res.json(obj);
    });
};

exports.create = (req, res) => {
    var contact = new Contact(req.body);
    console.log('create', obj);
    contact.save((err, obj) => {
        if (err)
            res.send(err);
        console.log('after create', obj);
        res.json(obj);
    });
};

exports.update = (req, res) => {
  Contact
      .findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, obj) => {
        if (err)
            res.send(err);
        res.json(obj);
    });
};

exports.delete = (req, res) => {
    console.log('delete', req.params.id)
    Contact.remove({_id: req.params.id}, (err, obj) => {
        if (err)
            res.send(err);
        res.json({ message: 'Contact deleted.' });
    });
};