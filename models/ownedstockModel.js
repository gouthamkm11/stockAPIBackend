var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ownedstkSchema = new Schema({
    googleID:{
        type:String,
        required:[true]
    },
    stocks:[{
        stock:String,
        shares:String
    }]
});

var Ownedstk = mongoose.model('ownedstock',ownedstkSchema);
module.exports = Ownedstk;