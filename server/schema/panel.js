const mongoose = require ('mongoose');

const panelSchema = mongoose.Schema({

  name : {
    type : String
  },
  email : {
    type: String
  },
  telephone : {
    type : String
  },
  product : [{
  productName: { type: mongoose.SchemaTypes.ObjectId, ref:'product'},
  quantite : {
    type : Number
  }
  }],
  statut : {
    type : String
  }

})
module.exports = panelSchema;
