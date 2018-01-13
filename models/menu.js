var mongoose = require('mongoose');

//Schema for menus
var menuSchema = new mongoose.Schema({
    name: String,
    owner: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    links: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Link"
        }  
        ]
}, {usePushEach: true});

//Mongoose models
var Menu = mongoose.model("Menu", menuSchema);

//Export
module.exports = Menu;

