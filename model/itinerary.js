const mongoose = require("mongoose");

var ItinerarySchema = new mongoose.Schema({
    title:{
        type: String
    },
    profilePic:{
        type: String
    },
    rating:{
        type : Number
    },
    price:{
        type: Number
    },
    name:{
        type: String
    },
    hashtag:{
        type: Array
    }
});

module.exports = mongoose.model("itineraries", ItinerarySchema);

