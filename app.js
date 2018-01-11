const   bodyParser      =   require("body-parser"),
        methodOverride  =   require("method-override"),
        mongoose        =   require("mongoose"),
        express         =   require("express"),
        app             =   express();

//Correct promise error
mongoose.Promise = global.Promise;

//Mongo DB Connection
mongoose.connect("mongodb://localhost/dashboard_app", {
  useMongoClient: true,
});

//Set view engine to read .ejs files
app.set("view engine", "ejs");

//Tell express to use public directory
app.use(express.static("public"));

//Other settings
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

// include routes
var routes = require('./routes/index');
app.use('/', routes);


// app.listen(process.env.PORT, process.env.IP, function(){
//     console.log("DASHBOARD SERVER IS RUNNING");
// });

app.listen(3030, function() {
  console.log('Dashboard Server is Running');
});
 TEST