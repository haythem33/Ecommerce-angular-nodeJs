const mongoose = require ('mongoose');

const ProductSchema = mongoose.Schema({
  name : {
  type : String
  },
  categorie : {
    type : String
  },
  prix : {
   type : Number
  },
  image : {
    type: String
  },
  description : {
    type : String
  }
})
module.exports = ProductSchema
