const express = require('express');
const app = express();
var cors = require('cors');
app.use(cors());
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = process.env.port || 3000;
var http = require('http').Server(app);
var io = require('socket.io')(http, {origins: '*:*'});

app.io = io;

app.use(bodyParser.json());

// importation des fichier
const auth = require('./auth/auth');
app.use('/auth', auth);
const contact = require('./contact/contactus');
app.use('/contact', contact);
const product = require('./product/product');
app.use('/product', product);
const panel = require('./panel/panel');
app.use('/panel', panel);
const pub = require('./pub/pub')
app.use('/pub', pub);
var publicDir = require('path').join(__dirname, '/uploads');
app.use(express.static(publicDir));



mongoose.connect('mongodb://localhost:27017/foxGroup', {
  useNewUrlParser: true,
  useCreateIndex: true,
}, (err) => {
  if (!err) {
    console.log('connected to database successfully')
  } else {
    console.log('error while connection')
  }
});
http.listen(port);

