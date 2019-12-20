const mongoose = require("mongoose");

var ActivitySchema = new mongoose.Schema({
  title: {
    type: String
  },
  pic: {
    type: String
  }
},
{ versionKey: '_somethingElse' 
});

module.exports = mongoose.model("activities", ActivitySchema);
