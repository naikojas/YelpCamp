var express               = require("express"),
	mongoose              = require("mongoose"),
	bodyParser            = require("body-parser"),
	User                  = require("./models/user"),
	passport              = require("passport"),
	LocalStrategy         = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose");


var app = express();
mongoose.set("useUnifiedTopology", true);
mongoose.set("useNewUrlParser",true);
mongoose.connect("mongodb://localhost/auth_demo_app");
app.use(require("express-session")({
	secret: "Ojas Is lover a true lover",
	resave: false,
	saveUninitialized: false
}));

app.use(bodyParser.urlencoded({extended:true}));
app.use(passport.initialize());
app.use(passport.session());
app.set("view engine", "ejs");

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//===========
// ROUTES
//===========

app.get("/", function(req, res){
	res.render("home");
});
app.get("/secret", function(req, res){
	res.render("secret");
});

//Auth Routes

//Show sign up
app.get("/register", function(req, res){
	res.render("register");
});
//Handling User sign Up

app.post("/register", function(req, res){
	req.body.username
	req.body.password
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(re, res, function(){
			res.redirect("/secret");
		});
	});
});

// LOgin

app.get("/login", function(req, res){
	res.render("login");
});

//LOGIN logic

 app.post("/login", passport.authenticate("local",{
		  successRedirect: "/secret",
		  failureRedirect: "/login"
}),function(req, res){
	 
 });

app.get("/register", function(req, res){
	res.render("register");
});

app.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("register");
		}
		passport.authentiacate("local")(req, res, function(){
			res.redirect("/campgrounds");
		});
	});
});
app.listen(3000, function(){
	console.log("Server is listening!");
});