var mongoose = require('mongoose');

//Schema for links
var linkSchema = new mongoose.Schema({
    title: String,
    name: String,
    url: String
});

//Mongoose model
var Link = mongoose.model("Link", linkSchema);


//Export
module.exports = Link;