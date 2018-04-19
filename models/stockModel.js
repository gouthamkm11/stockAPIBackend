var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stockSchema = new Schema({
    googleID:{
        type:String,
        required:[true]
    },
    stocks:{
        type:[String]
    }
});

var Stocks = mongoose.model('stock', stockSchema);
module.exports = Stocks;