var db = require('../models')

module.exports = function(app) {

    app.get("/api/donations", function(req, res) {
      db.Donation.findAll({}).then(data=>res.json(data));
    });

    app.get("/api/requests", function(req, res) {
      db.Request.findAll({}).then(data=>res.json(data));
    });
  
    app.get("/api/items", function(req, res) {
      db.Item.findAll({}).then(data=>res.json(data));
    });
  
    app.get("/api/requests/:id", function(req, res) {
      db.Request.findById(req.params.id).then(data=>res.json(data));
    });
  
    app.post("/api/requests", function(req, res) {
      console.log(req.body)
      db.Request.create({
        description: req.body.description,
        quantity: req.body.quantity
      }).then(dbRequest=>res.json(dbRequest))
      .catch(err=>res.json(err));
    });

    app.post("/api/donations", function(req, res) {
      db.Donation.create({
        description: req.body.description,
        quantity: req.body.quantity
      }).then(dbDonation=>res.json(dbDonation))
      .catch(err=>res.json(err));
    });

}