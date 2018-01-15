const mongoose = require('mongoose'),
  Contact = mongoose.model('Contact'),
  Track = mongoose.model('Track'),
  Page = mongoose.model('Page')

exports.createOrUpdate = (contact) => {
    // contact.email = 'luiz@gmail.com1'

    // let dogs = [
    //     {
    //         _
    //         name: 'test',
    //         birth_date: new Date(),
    //         toys: [
    //             {
    //                 name: 'ball',
    //                 logs: [
    //                     {
    //                         created_datetime: new Date(),
    //                     }
    //                 ]
    //             }
    //         ]
    //     }
    // ]

    // contact.dogs = dogs
    // let contactObj = new Contact(contact)
    // contactObj.save()
    // Contact.findOne({email: contact.email}).exec((err, obj) => {
    // })
}

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