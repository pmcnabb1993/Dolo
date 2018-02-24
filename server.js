var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var session = require("express-session");
var passport = require("./config/passport.js")

//Ports
var PORT = process.env.PORT || 8080;
var db = require("./models");

//Express and middleware configuration needed for Authentication
var app =  express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(methodOverride('_method'));

//We will use sessions to keep tracker of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

//Requiring our Routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

//Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("Listening on port %s. Visit http://localhosts:%s/ in your browser.", PORT, PORT);
  });
});



//BC wrote this code and I'm not sure if we need it now with what I've added in terms of passport stuff. 
// var routes = require('./controllers/Router.js');
// app.get('/', function (req, res) {
//   res.send('Hello World!')
// })
// app.post('/', function (req, res) {
//   res.send('Got a POST request')
// })
// app.put('/user', function (req, res) {
//   res.send('Got a PUT request at /user')
// })
// app.delete('/user', function (req, res) {
//   res.send('Got a DELETE request at /user')
// })
// app.post('');
// app.listen(PORT);