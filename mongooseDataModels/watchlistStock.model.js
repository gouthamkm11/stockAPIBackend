var Watchlist = require('../models/stockModel');

module.exports = function(req,res,next){
    var userID = req.body.googleID;
    var stock = req.body.stock;
    Watchlist.findOneAndUpdate({googleID:userID},{$push: {stocks:stock}});
};