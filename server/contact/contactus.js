const express = require('express');
var mongoose = require('mongoose');
const app = express();
const router = require('express').Router();

// importation des Model
var contact = require('./../schema/contactus');
const contactModel = mongoose.model('contact', contact);

// post a contact
router.post('/add', (req,res)=> {
  var contact = new contactModel();
  contact.name = req.body.name;
  contact.email = req.body.email;
  contact.telephone = req.body.phoneNumber
  contact.description = req.body.description
  contact.save((err, doc) => {
    if (!err) {
      res.send({message:'new contact send'})
    } else {
      res.send({message :'Noo'});
    }
  })
});
router.get('/get', async (req,res)=> {
   const result = await contactModel.find();
   res.send(result);
})
router.get('/delete/:id', async (req,res) => {
  let id = {_id : req.params.id}
  const result = await contactModel.findByIdAndRemove(id)
  res.send(result);
})

module.exports = router;
