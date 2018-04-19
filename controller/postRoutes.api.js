var bodyParser = require('body-parser');
var Watchlist = require('../models/stockModel');
module.exports = function(app){

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    //This post request adds new stock to the existing user.
    //If not it will create a new stock to the new user.
    app.post('/api/watchlistData',(req,res)=>{
        let userID = req.body.googleID;
        Watchlist.findOne({"googleID":userID}).then((user)=>{
            if(user){
                console.log("into method");
                //add the stock symbol to the existing array
                let stock = req.body.stocks;
                Watchlist.findOneAndUpdate({googleID:userID},{$push: {stocks:stock}},
                    { new:true}).then((newRecord)=>{
                        res.send(newRecord);
                    });
                }
            else{
                //Add the new user into the DB.
            }
        })
    })
}