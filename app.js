const   bodyParser      =   require("body-parser"),
        methodOverride  =   require("method-override"),
        mongoose        =   require("mongoose"),
        express         =   require("express"),
        app             =   express(),
        passport                = require("passport"),
        LocalStrategy           = require("passport-local"),
        passportLocalMongoose   = require("passport-local-mongoose"),
        User                    =require("./models/user"),
        flash                   =require("connect-flash");



//Correct promise error
mongoose.Promise = global.Promise;


//Mongo DB Connection

mongoose.connect(process.env.DATABASEURL, { useMongoClient: true });


//Set view engine to read .ejs files
app.set("view engine", "ejs");

//Tell express to use public directory
app.use(express.static("public"));

//Other settings
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));




//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "My Secret Password",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());

//MAKE AVAILABLE EVERYWHERE
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});



// include routes
var routes = require('./routes/index');
app.use('/', routes);




app.listen(process.env.PORT, process.env.IP, function(){
    console.log("DASHBOARD SERVER IS RUNNING");
});

// app.listen(3030, 'localhost',  function() {
//   console.log('Dashboard Server is Running');
// });