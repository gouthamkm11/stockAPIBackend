var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var accountSchema = new Schema({
    googleID:{
        type:String,
        required:[true]
    },
    portfolioValue:{
        type:String
    },
    buyingPower:{
        type:String
    }
});

var Account = mongoose.model('useraccount',accountSchema);
module.exports = Account;