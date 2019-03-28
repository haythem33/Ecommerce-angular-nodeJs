const express = require('express');
var mongoose = require('mongoose');
const app = express();
const router = require('express').Router();
var jwt = require('jsonwebtoken');

// Importation des Model

const panel = require('./../schema/panel');
const panelModel = mongoose.model('panel', panel);

var User = require('./../schema/user');
var userModel = mongoose.model('user', User);

// add panel with account
router.post('/addToaccount/:id', async (req,res) => {
const getpanel = await panelModel.findOne({_id : req.body.panel})
if (getpanel) {
  for (const product of getpanel.product) {
    if (JSON.stringify(product.productName) === JSON.stringify(req.body.product[0].productName)) {
      var message ='exist'
    }}
    if (message !== 'exist') {
  const addPanel = await panelModel.updateOne(getpanel, { $addToSet: { product: req.body.product} })
  res.send({message:'add to panel'});
}
} else if (!getpanel) {
  var panel = new panelModel(req.body)
  panel.save(async (err,doc) => {
    if (!err) {
      let id = {_id : req.params.id}
      const setUser = await userModel.updateOne(id,{$set: {panel : panel._id}});
      const getUser = await userModel.findOne({_id : req.params.id})
      res.send({message:'create Panel', token: jwt.sign({data : getUser}, 'secret')});
    }
  })

}
});

// add panel without account

router.post('/addNoaccount', async (req,res) => {
  const getpanel = await panelModel.findOne({_id : req.body.panel});
  if (getpanel) {
    for (const product of getpanel.product) {
      if (JSON.stringify(product.productName) === JSON.stringify(req.body.product[0].productName)) {
        var message ='exist'
      }}
       if (message !== 'exist') {
       const addPanel = await panelModel.updateOne(getpanel, { $addToSet: { product: req.body.product}})
       res.send({message:'Add to Panel'})
       }
   } else if (!getpanel) {
    var panel = new panelModel(req.body);
    panel.save(async (err,doc) => {
     if (!err) {
       res.send({message: 'create panel', data: panel._id});
     }
    })
  }
})
router.post('/loginPanel/:idUser', async (req,res)=> {

const result = await panelModel.findOne({_id : req.body.id2});
const result2 = await panelModel.findOne({_id : req.body.id});
if (result && result2) {
  const addPanel = await panelModel.updateOne(result, { $addToSet: { product: result2.product}}).catch()
  const deletePanel = await panelModel.findByIdAndRemove(result2._id).catch();
  res.send(deletePanel);
  } else if (!result) {
    const setUser = await userModel.findOneAndUpdate(req.params.idUser,{$set: {panel : result2._id}}).catch();
    const getUser = await userModel.findOne({_id : req.params.idUser}).catch()
    res.send({message : 'new Panel' , token: jwt.sign({data : getUser}, 'secret')});
  }
})
router.get('/getpanel/:id', async (req,res)=> {
  const result = await panelModel.findOne({_id : req.params.id}).populate('product.productName');
  if (result) {
    res.send(result)
    req.app.io.emit('getpanel', result);
  }
})
router.get('/deleteProduct/:id/:idProduct', async (req,res)=> {
  let id = {_id : req.params.id};
    const deletePanel = await panelModel.updateOne(id, {$pull : {product : { productName : req.params.idProduct}}}).catch();
    const  getPanel = await panelModel.findOne(id);
    res.send(getPanel);
})
router.post('/updatenombre/:id/:index', async (req,res) => {
  let id = {_id : req.params.id}
  const resultat = await panelModel.updateOne(id, {$set: {['product.'+ req.params.index]: req.body}});
  const getPanel = await panelModel.findOne(id)
  res.send(getPanel);
})
router.post('/confirmPanel/:id/:idUser', async (req,res)=> {
let id = {_id :req.params.id};
let idUser = {_id : req.params.idUser}
const result = await panelModel.updateOne(id, {$set : {statut : req.body.statut , name : req.body.name , email : req.body.email, telephone : req.body.telephone}})
const result2 = await userModel.updateOne(idUser, {$set : {panel : null}});
const getUser = await userModel.findOne(idUser);
res.send({message:'confirm Panel', token: jwt.sign({data : getUser}, 'secret')});
})
router.get('/deletePanel/:id', async (req,res)=> {
  let id = {_id : req.params.id}
  const result = await panelModel.findByIdAndRemove(id)
  res.send(result)
})
router.post('/getActivePanel', async (req,res) => {
  const result = await panelModel.find({statut : req.body.statut}).populate('product.productName')
  res.send(result)
})
router.post('/confirmPanelNoAccount/:id', async (req,res)=> {
  let id = {_id :req.params.id};
  const result = await panelModel.updateOne(id, {$set : {statut : req.body.statut , name : req.body.name , email : req.body.email, telephone : req.body.telephone}})
  res.send({message : 'confirm Panel'})
})
router.post('/panelDone/:id', async (req,res)=> {
  let id = {_id :req.params.id};
  const result = await panelModel.updateOne(id, {$set : {statut : req.body.statut}})
})
router.post('/getHistory', async (req,res) => {
  const result = await panelModel.find({statut : req.body.statut}).populate('product.productName')
  if (result) {
    res.send(result);
  }
})


module.exports = router;
