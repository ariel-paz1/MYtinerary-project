const mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    userName:{
        type: String
    },
    password:{
        type: String
    },
    email:{
        type : String
    },
    name:{
        type: String
    },
    country:{
        type: String
    },
    image:{
        type: String
    },
    favorites:{
        type: Array
    }
    },{ versionKey: '_somethingElse' });

module.exports = mongoose.model("users", UserSchema);

