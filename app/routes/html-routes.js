// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads index.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // app.get("/cms", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/cms.html"));
  // });

  // route loads donations.html
  app.get("/donations", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/donate.html"));
  });

  // route loads requests.html
  app.get("/requests", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/requests.html"));
  });

};
