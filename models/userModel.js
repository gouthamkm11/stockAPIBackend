var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    googleID: {
        type:String,
        required:[true]
    },
    username:{
        type:String
    },
    profilePic:{
        type:String
    },
    gender:{
        type:String
    }
});

var User = mongoose.model('user', userSchema);
module.exports = User;