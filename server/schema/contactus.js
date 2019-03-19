const mongoose = require ('mongoose');

const ContactSchema = mongoose.Schema({
  name : {
    type : String
  },
  email :  {
    type : String
  },
  telephone : {
    type : Number
  },
  description :  {
    type : String
  }
})
module.exports = ContactSchema
