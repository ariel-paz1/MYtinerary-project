const mongoose = require("mongoose");

var ItinerarySchema = new mongoose.Schema({
    title:{
        type: String
    },
    rating:{
        type : Number
    },
    price:{
        type: Number
    },
    citi_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cities'
    },
    profilePic:{
        type: String
    },
    userName:{
        type: String
    },
    hashtag:{
        type: Array
    }},{ versionKey: '_somethingElse' });

module.exports = mongoose.model("itineraries", ItinerarySchema);

