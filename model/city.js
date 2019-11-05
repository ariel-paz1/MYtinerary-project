const mongoose = require("mongoose");

var CourseSchema = new mongoose.Schema({
    name:{
        type: String
    },
    country:{
        type: String
    }
});

module.exports = mongoose.model("cities", CourseSchema)