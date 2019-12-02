const mongoose = require("mongoose");

var ActivitySchema = new mongoose.Schema({

title:{
    type: String
},
pic:{
    type: String
}
})

module.exports = mongoose.model("activities", ActivitySchema);