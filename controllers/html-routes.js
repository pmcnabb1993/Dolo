//Requiring path so we can use relative routes to our HTML files
var path = require("path");

//Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../app/config/middleware/isAuthenticated");

module.exports = function(app)  {
    
    app.get("/", function(req, res) {
        //If the user already has an account send them to the members page
        if (req.user)   {
            res.redirect("/members");
        }
        res.sendFile(path.join(__dirname, "../app/public/signup.html"));
    });

    app.get("/login", function(req, res)    {
        //If the user already has an account send them to the members page
        if (req.user)   {
            res.redirect("/members");
        }
        res.sendFile(path.join(__dirname, "../app/public/login.html"));
    });

    //Here we've added our isAuthenticated middleware to this route.
    //If a user who is logged in tries to access this route they will be redirected to the signup page

    app.get("/members", isAuthenticated, function(req, res) {
        res.sendFile(path.join(__dirname, "../app/public/member.html"));
    });
};