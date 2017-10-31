var mongoose = require('mongoose');

//Schema for menus
var menuSchema = new mongoose.Schema({
    title: String,
});

//Mongoose models
var Menu = mongoose.model("Menu", menuSchema);

//Export
module.exports = Menu;