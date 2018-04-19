var express = require('express');
var mongoose = require('mongoose');
var connStr = require('./config/db.connection');
var getRoutes = require('./controller/getRoutes.api');
var postRoutes = require('./controller/postRoutes.api');
var cors = require('cors');

var app = express();

app.use(cors());
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

//server functions
getRoutes(app);
postRoutes(app);

//db Connection
mongoose.connect(connStr.config.conString);
//mongoose.Promise = global.Promise;
mongoose.connection.on('connected', (err)=>{
    console.log("DB Connected");
});


//Initial route configuration
app.get('/', (req,res)=>{
    res.send('Home Page');
})


app.listen(3002);