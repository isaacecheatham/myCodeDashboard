const   express = require('express'),
        router  = express.Router(),
        Link    = require('../models/link'),
        Menu    = require('../models/menu');


//RESTFUL ROUTES


//Redirect from root to Dashboard
router.get("/", function(req, res){
    res.redirect("/dashboard");
});



//INDEX ROUTE
router.get("/dashboard", function(req, res){
    Menu.find().sort('title').exec(function(err, titles){
        if(err){
            console.error(err);
            console.log(err);
        } else {
            Link.find().sort('name').exec(function(err, links){
                if(err) {
                    console.log(err);
                } else {
                    res.render("index", {titles: titles, links: links});
                }
            });
        }
    });
});


//CREATE MENU ROUTE
router.post("/dashboard/new_menu", function(req, res) {
    // create blog
    Menu.create(req.body.menu, function(err, newMenu){
        if(err) {
            console.error(err);
            res.render("new_menu");
        } else {
             //redirect to index
            res.redirect("/dashboard");
        }
    });
});


//CREATE LINK ROUTE
router.post("/dashboard/new_link", function(req, res) {
    // create blog
    Link.create(req.body.link, function(err, newLink){
        if(err) {
            console.error(err);
            res.render("new_link");
        } else {
             //redirect to index
            res.redirect("/dashboard");
        }
    });
});



//UPDATE LINK ROUTE
router.put("/dashboard/:id", function(req, res){
    Link.findByIdAndUpdate(req.params.id, req.body.link, function(err, updatedLink){
      if(err){
          console.error(err);
          res.redirect("/dashboard");
      }  else {
          res.redirect("/dashboard");
      }
    });
});


//UPDATE MENU ROUTE
router.put("/dashboard/:id/edit_menu", function(req, res){
    
    Menu.findById(req.params.id, function(err, found){
        if(err) {
            console.log(err);
        } else {
    Menu.findByIdAndUpdate(req.params.id, req.body.title, function(err, updatedTitle){
      if(err){
          res.redirect("/dashboard");
      }  else {
          Link.update({title: found.title}, req.body.title, {"multi": true}, function(err, updatedLinkTitle){
              if(err){
                  res.redirect("/dashboard");
                  console.log(err);
              }  else {
                  res.redirect("/dashboard");
              }
          });
      }
    });
        }
});
  
    });



//DELETE MENU ROUTE
router.delete("/dashboard/:id/deleteMenu", function(req, res){
    Menu.findById(req.params.id, function(err, found){
        if(err) {
            console.log(err);
        } else {
   
    Menu.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/dashboard");
        } else {
            Link.deleteMany({title: found.title}, function(err){
              if(err){
                  res.redirect("/dashboard");
                  console.log(err);
              }  else {
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
    //DESTROY
    Link.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/dashboard");
        } else {
            res.redirect("/dashboard");
        }
    });
});


module.exports = router;