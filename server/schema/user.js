const mongoose = require ('mongoose');

const UserSchema = mongoose.Schema({

  username : {
    type : String
  },
  email : {
    type: String
  },
  role : {
    type:String
  },
  password: {
    type: String
  },
  telephone : {
  type : Number
  },
  panel : {type: mongoose.SchemaTypes.ObjectId, ref:'panel'}
})
module.exports = UserSchema
