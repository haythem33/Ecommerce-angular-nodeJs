const mongoose = require ('mongoose');

const PubSchema = mongoose.Schema({

    lien : {
    type :String
    },
    image : {
        type : String
     },
})
module.exports = PubSchema;