var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user")
var middleware = require("../middleware");
var Link    = require('../models/link');
var Menu    = require('../models/menu');


//ROOT ROUTE
router.get("/", function(req, res){
     res.redirect("/dashboard");
});


//INDEX ROUTE
router.get("/dashboard", middleware.isLoggedIn, function(req, res){
    Menu.find({"owner.id":req.user._id}).sort('name').populate("links").exec(function(err, menunames){ //Find all menus to display
        if(err){
            req.flash("error", "Something went wrong");
        } else {
          res.render("index", {menus: menunames});
        }
    });
});



//==========AUTH ROUTES==============

router.post("/register", (req, res) => {
    
    if(req.body.password != req.body.verifyPassword){
        req.flash("error", "Passwords do not match, try again");
        res.redirect('/login');
    } else {
    
    req.body.username = req.body.username.toUpperCase();
    var newUser = User({username: req.body.username});
    
    User.register(newUser, req.body.password, (err, user) => {
        if(err){
            req.flash("error", err.message);
            return res.redirect('/login');
        }
        
        passport.authenticate("local")(req, res, () => {
            req.flash("success", "Welcome " + user.username);
            res.redirect("/dashboard");
        });
    });
    }
});

//LOGIN ROUTES
router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", usernameToUpperCase, passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}) ,(req, res) => {
    
});
function usernameToUpperCase(req, res, next){
    req.body.username = req.body.username.toUpperCase();
    next();
}


//LOGOUT ROUTE
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Logged out successfully");
    res.redirect("/login");
});



//======================MENU ROUTES=======================


//CREATE MENU ROUTE
router.post("/dashboard/new_menu",middleware.isLoggedIn, function(req, res) {

    var name = req.body.name;
    var owner = {
        id: req.user._id,
        username: req.user.username
    };
    var newMenu = {name: name, owner:owner};
    // create menu
    Menu.create(newMenu, function(err, newMenu){  //Add new menu to db
        if(err) {
            req.flash("error", "Something went wrong, try again");
            res.redirect("/dashboard");
        } else {
             //redirect to index
            req.flash("success", "Menu created");
            res.redirect("/dashboard");
        }
    });
});


//CREATE LINK ROUTE 
router.post("/dashboard/:id/new_link", middleware.isLoggedIn, function(req, res) {  
    var id = req.params.id;
    var name = req.body.linkname;
    var url = req.body.url;
    var owner = {
        id: req.user._id,
        username: req.user.username
    };
    
    var newLink = {name:name, url:url, parentmenuid:id, owner:owner};
    
    
      Menu.findOne({"_id":id}).exec(function(err, menu){
        if(err) {
            req.flash("error", "Something went wrong, try again");
            res.redirect("back");
        } else {
            Link.create(newLink, function(err, createdLink){  //Add a new link to a menu in db
            if(err) {
                req.flash("error", "Something went wrong, try again");
                res.render("new_link");
            } else {
                menu.links.push(createdLink);
                menu.save();
                req.flash("success", "Link added to the " + menu.name + " menu");
                res.redirect("/dashboard");
            }
        });
        }
    });
});



//UPDATE LINK ROUTE
router.put("/dashboard/:id", function(req, res){
    Link.findByIdAndUpdate(req.params.id, req.body.link, function(err, updatedLink){  //Find a link and update
      if(err){
          req.flash("error", "Something went wrong, try again");
          res.redirect("/dashboard");
      }  else {
          req.flash("success", "Link updated successfully");
          res.redirect("/dashboard");
      }
    });
});



//UPDATE MENU ROUTE
router.put("/dashboard/:id/edit_menu", function(req, res){  
    
    Menu.findByIdAndUpdate(req.params.id, req.body.title, function(err, updatedTitle){   //Update the menu
      if(err){
          req.flash("error", "Something went wrong, try again");
          res.redirect("/dashboard");
      }  else {
            req.flash("success", "The " + updatedTitle.name + " menu was updated to " + req.body.title.name);
                  res.redirect("/dashboard");
              }
          });
});




//DELETE MENU ROUTE
router.delete("/dashboard/:id/deleteMenu", function(req, res){
    Menu.findById(req.params.id, function(err, found){    //Find the menu
        if(err) {
            req.flash("error", "Something went wrong, try again");
            res.redirect("/dashboard");
        } else {
    Menu.findByIdAndRemove(req.params.id, function(err){   //If found then delete the menu
        if(err){ 
            req.flash("error", "Something went wrong, try again");
            res.redirect("/dashboard");
        } else {
            Link.deleteMany({parentmenuid: req.params.id}, function(err){
              if(err){
                  req.flash("error", "Something went wrong, try again");
                  res.redirect("/dashboard");
              }  else {
                  req.flash("error", "The " + found.name + " menu was DELETED");
                  res.redirect("/dashboard");
              }
            });
        }
    });
        }
    });
});


//DELETE LINK ROUTE
router.delete("/dashboard/:id/deleteLink", function(req, res){
    Menu.findOneAndUpdate({"links": req.params.id },{$pull: {"links": req.params.id }}).exec(function(err, menu){
        if(err) {
            req.flash("error", "Something went wrong, try again");
            res.redirect("/dashboard");
        } else {
            Link.findByIdAndRemove(req.params.id, function(err, link){    //Find the link and delete
                if(err){
                    req.flash("error", "Something went wrong, try again");
                    res.redirect("/dashboard");
                } else {
                    req.flash("error", "The " + link.name + " link was DELETED");
                    res.redirect("/dashboard");
                }
            });
        }
    });
});


module.exports = router;  //Export to use in app.js