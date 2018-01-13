var mongoose = require('mongoose');

//Schema for links
var linkSchema = new mongoose.Schema({
    name: String,
    url: String,
    parentmenuid: String,
    owner: 
    {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
    
});

//Mongoose model
var Link = mongoose.model("Link", linkSchema);


//Export
module.exports = Link;