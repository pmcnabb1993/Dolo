
// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function (app) {

    // Each of the below routes just handles the HTML page that the user gets sent to.

    // index route loads index.html
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    // app.get("/cms", function(req, res) {
    //   res.sendFile(path.join(__dirname, "../public/cms.html"));
    // });

    // // route loads donations.html
    // app.get("/donations", function (req, res) {
    //     res.sendFile(path.join(__dirname, "../public/donate.html"));
    // });

    // route loads requests.html
    app.get("/requests", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/requests.html"));
    });

};

//Requiring path so we can use relative routes to our HTML files
var path = require("path");

//Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

    app.get("/signup", function (req, res) {
        console.log("Where hit the signup route");
        //If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/members");
        }
        res.sendFile(path.join(__dirname, "../public/signup.html"));
    });

    app.get("/login", function (req, res) {
        //If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/members");
        }
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });

    //Here we've added our isAuthenticated middleware to this route.
    //If a user who is logged in tries to access this route they will be redirected to the signup page

    app.get("/members", isAuthenticated, function (req, res) {
        res.sendFile(path.join(__dirname, "../public/member.html"));
    });

    // route loads donations.html
    app.get("/donations", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/donate.html"));
    });
};

