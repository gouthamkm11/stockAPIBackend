var express = require('express');
var mongoose = require('mongoose');
var connStr = require('./config/db.connection');
var getRoutes = require('./controller/getRoutes.api');
var postRoutes = require('./controller/postRoutes.api');
var cors = require('cors');

var app = express();

//db Connection
mongoose.connect(connStr.config.conString);
mongoose.Promise = global.Promise;
mongoose.connection.on('connected', (err)=>{
    console.log("DB Connected");
});

//First Middleware - For getting request from 3rd party clients
app.use(cors());
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

//Initializing all our routes
getRoutes(app);
postRoutes(app);
//Initial route configuration
app.get('/', (req,res)=>{
    res.send('Home Page');
})

//Second Middlewate - For error handling
app.use(function(err,req,res,next){
    res.status(422).send({Error:err.message});
});

app.listen(3002);