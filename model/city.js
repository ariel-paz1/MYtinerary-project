const mongoose = require("mongoose");

var CourseSchema = new mongoose.Schema({
    name:{
        type: String
    },
    country:{
        type: String
    }
},{ versionKey: '_somethingElse' });

module.exports = mongoose.model("cities", CourseSchema)