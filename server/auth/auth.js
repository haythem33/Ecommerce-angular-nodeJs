const express = require('express');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const app = express();
const router = require('express').Router();



// importation des Model
var User = require('./../schema/user');
var userModel = mongoose.model('user', User);


// create account

router.post('/register', async (req,res)=> {
const getUser = await userModel.findOne({email : req.body.email});
if (!getUser) {
  var user = new userModel();
  user.username = req.body.username;
  user.email = req.body.email;
  user.password = bcrypt.hashSync(req.body.password);
  user.telephone = req.body.telephone
  user.role = req.body.role
  user.save((err , doc) => {
  if (!err) {
    res.send({message: "new User"});

  } else {
    res.send(err);
  }
  })
} else {
  res.send({message :'invalid email'});
}
});

// login to account
router.post('/login', async (req,res)=> {
  const resultLogin = await userModel.findOne({email : req.body.loginEmail});
  if (resultLogin) {
   if (bcrypt.compareSync(req.body.loginPassword, resultLogin.password)) {
      res.send({message : 'user ok', token: jwt.sign({data : resultLogin}, 'secret')});
   } else {
      res.send({message:'error in input'})
    }
  } else {
    res.send({message:'user Not found'});
  }
 });

 // login Admin
 router.post('/loginAdmin', async (req,res) => {
   const result = await userModel.findOne({email : req.body.loginEmail})
   if (result && result.role === 'admin' && bcrypt.compareSync(req.body.loginPassword, result.password)) {
     res.send({message : 'Admin Ok' , token : jwt.sign({data: result}, 'secret')});
   } else {
     res.send({message : 'User No found'})
   }
 })
module.exports = router;
