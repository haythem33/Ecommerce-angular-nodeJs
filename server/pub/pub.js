const express = require('express');
var mongoose = require('mongoose');
const app = express();
var multer  = require('multer');
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

var pub = require('./../schema/pub');
var pubModel = mongoose.model('pub', pub);

// upload image

router.post('/upload',  upload.single('file'), async (req, res, next) => {
    res.send(req.file)
});

router.post('/add', async (req,res) => {
var pub = new pubModel(req.body);
pub.save((err,doc)=> {
    if (!err) {
        res.send({message : 'add Ok'})
    } else {
        res.send(err);
    }
})
})
router.get('/get' , async (req,res) => {
    const result = await pubModel.find();
    res.send(result);
})
router.get('/delete/:id', async (req,res) => {
  let id = {_id : req.params.id}
  const result = await pubModel.findByIdAndRemove(id)
  res.send(result)
})



module.exports = router;