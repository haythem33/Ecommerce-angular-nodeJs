const express = require('express');
var mongoose = require('mongoose');
var multer  = require('multer');
const app = express();
const router = require('express').Router();
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
});

var upload = multer({
  storage: storage
})

// importation des model
var Product = require('./../schema/product');
var productModel = mongoose.model('product', Product);

// upload image
router.post('/upload',  upload.single('file'), async (req, res, next) => {
  res.send(req.file)
 });

// add new product

router.post('/add', async (req,res) => {
const result = await productModel.findOne({name : req.body.name});
if (!result) {
  var product = new productModel(req.body);
  product.save((err,doc) => {
    if (!err) {
      res.send({message: 'add Ok'})
    } else {
      console.log(err);
    }
  })
} else {
  res.send({message : 'the name exist'})
}
});
// get all product
router.get('/get', async (req,res)=> {
  const result = await productModel.find();
  res.send(result);
});
router.get('/get/:categorie', async (req,res)=> {
 const result = await productModel.find({categorie : req.params.categorie});
 if (result) {
   res.send(result);
 } else {
  res.send({message : 'no data'})
}

 })
router.get('/getbyFilter/:filter', async (req,res)=> {
  const result = await productModel.find({name : req.params.filter});
  if (result.length > 0) {
    console.log(result)
    res.send(result)
  } else  {
    res.send({message : 'no data'})
  }

});
router.get('/getById/:id', async (req,res)=> {
  const result = await productModel.findOne({_id : req.params.id});
  if (result) {
    res.send(result);
  }
})








module.exports = router;
