var User = require('../models/userModel');
var Stock = require('../models/stockModel');
var Ownedstk = require('../models/ownedstockModel');
var Account = require('../models/accounrModel');

module.exports = function(app){
    app.get('/api/userData', (req,res)=>{
        User.findOne({"googleID":14}).then((result)=>{
            res.send(result);
        })
    });

    app.get('/api/watchlistData', (req,res)=>{
        Stock.findOne({"googleID":14}).then((result)=>{
            res.send(result);
        })
    });

    app.get('/api/ownedData',(req,res)=>{
        Ownedstk.findOne({"googleID":14}).then((result)=>{
            res.send(result);
        })
    })

    app.get('/api/accountData',(req,res)=>{
        Account.findOne({"googleID":12}).then((result)=>{
            res.send(result);
        })
    })
}