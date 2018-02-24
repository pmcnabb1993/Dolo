//Requireing our models and passport as we've configured it

var db = require("../models"); 
var passport = require("../config/passport");

module.exports = function(app)  {
    //Using the passport.authenticate middleware with our local strategy.
    //If the user has valid login, they will be sent to the member page
    //Otherwise the user will be given an error
app.post("/api/login", passport.authentication("local"), function(req, res) {
    //Since we are doing a post with javascript, we can't actually redirect that post into a GET request
    //So we're the user back the route to the members page because the redirect will happen on the front end
    //They won't get this or even be able to access this if they authenticated
    res.json("./members.js")
});

    //Route for signing up a user. The User's password is automatically hashed and stored secretly thanks to how we
    //configured our Sequelize User Model.  If the user is created successfully, proceed to log in the user.
    //Otherwise send back an error
    app.post("/api/signup", function(req, res)  {
        console.log(req, body);
        db.User.create({
            emai: req.body.email,
            password: req.body.password
        }).then( function()  {
            res.redirect(307, "/api/login");
        }).catch(function(err)  {
            console.log(err);
            res.json(err);
        })
    })


}