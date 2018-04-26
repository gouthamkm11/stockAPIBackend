var bodyParser = require('body-parser');
var Watchlist = require('../models/stockModel');
var Ownedstock = require('../models/ownedstockModel');
var Account = require('../models/accountModel');
module.exports = function(app){

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    //This post request adds new stock to the existing user.
    //If not it will create a new stock to the new user.
    app.post('/api/watchlistData',(req,res)=>{
        let userID = req.body.googleID;
        Watchlist.findOne({"googleID":userID}).then((user)=>{
            if(user){
                //add the stock symbol to the existing array
                let stock = req.body.stocks;
                Watchlist.findOneAndUpdate({googleID:userID},{$push: {'stocks':{stock:stock}}},
                    { new:true}).then((newRecord)=>{
                        res.send(newRecord);
                    });
                }
            else{
                //Add the new user into the DB.
            }
        })
    })

    app.post('/api/removeStocks',(req,res)=>{
        let userID = req.body.googleID;
        let stock = req.body.stock;
        Watchlist.findOneAndUpdate({googleID:userID},{$pull: {'stocks':{stock:stock}}},
        { safe:true}).then((newRecord)=>{
            res.send(newRecord);
        });
        })

    app.post('/api/buyStocks', (req,res)=>{
        //this request will check for stock.
        //If the stock exits the share value will be updated.
        //else new stock along with share value will be updated.
        var userID = req.body.googleID;
        var stock = req.body.stkSymbol;
        var shares = req.body.shares;
        var purchaseCost = req.body.purchaseCost;
        Ownedstock.findOne({"googleID":userID}).then((profile)=>{
            //get the array list from DB
            //check for symbol and update the shares
            //if not create a new stock with share entry.
            //var data = profile;
            var checkValue = false;
            var stocksArray = profile.stocks;
            var currentShare
            for(var i=0; i < stocksArray.length; i++)
            {
                if(stocksArray[i].stock==stock){
                    currentShare = stocksArray[i].shares;
                    // console.log(`Shares ${currentShare}`);
                    // console.log(`Symbol ${stocksArray[i].stock}`);
                    checkValue = true;
                }
            }
            if(checkValue == true)
            {
                var updatedShare = Number(currentShare) + Number(shares);
                // let vals = {'shares':updatedStock};
                Ownedstock.findOneAndUpdate({"googleID":userID, "stocks.stock":stock},
                {$set: {'stocks.$.shares':updatedShare}},
                { new:true},(err)=>{
                    console.log(err);
                }).then((newRecord)=>{
                    res.send("newRecord");
                    Account.findOne({"googleID":userID}).then((profile)=>{
                        var currentBuy = Number(profile.buyingPower);
                        var buyPower = currentBuy - Number(purchaseCost);
                        console.log(`asdfasdf ${buyPower}`);
                        Account.findOneAndUpdate({googleID:userID},{$set: {buyingPower:buyPower}},{ new:true})
                            .then((newRecord)=>{
                                newRecord;
                            });
                    });
                })
            }
            else{
                Ownedstock.findOneAndUpdate({"googleID":userID},{$push: {'stocks':{'stock':stock,'shares':shares}}})
                .then((newRecord)=>{
                    Account.findOne({"googleID":userID}).then((profile)=>{
                        var currentBuy = Number(profile.buyingPower);
                        var buyPower = currentBuy - Number(purchaseCost);
                        console.log(`asdfasdf ${buyPower}`);
                        Account.findOneAndUpdate({googleID:userID},{$set: {buyingPower:buyPower}},{ new:true})
                            .then((newRecord)=>{
                                newRecord;
                            });
                    });
                    res.send("New record inserted");
                });
            }
        });
    })


    app.post('/api/sellStocks', (req,res)=>{
        let userID = req.body.googleID;
        let stock = req.body.stkSymbol;
        let shares = req.body.shares;
        let currentShare = req.body.currentShares;
        let sellCost = req.body.sellCost;
        let updatedShare = Number(currentShare) - Number(shares);
        Ownedstock.findOneAndUpdate({"googleID":userID, "stocks.stock":stock},
                {$set: {'stocks.$.shares':updatedShare}},
                { new:true},(err)=>{
                    console.log(err);}).then((newRecord)=>{
                    res.send("newRecord");
                    Account.findOne({"googleID":userID}).then((profile)=>{
                        var currentBuy = Number(profile.buyingPower);
                        var buyPower = currentBuy + Number(sellCost);
                        Account.findOneAndUpdate({googleID:userID},
                            {$set: {buyingPower:buyPower}},{ new:true})
                            .then((newRecord)=>{
                                newRecord;
                            });
                        });
                    })
                });
}