var db = require('../models')

module.exports = function(app) {

    app.get("/api/donations", function(req, res) {
      db.Donation.findAll({}).then(data=>res.json(data));
    });

    app.get("/api/requests", function(req, res) {
      db.Request.findAll({}).then(data=>res.json(data));
    });
  
    app.get("/api/requests/:id", function(req, res) {
      db.Request.findById(req.params.id).then(data=>res.json(data));
    });
  
    app.post("/api/requests", function(req, res) {
      console.log(req.body)
      db.Request.create({
        name: req.body.name,
        description: req.body.description,
        uid: req.body.uid,
        item_categoryID: req.body.item_categoryID,
        type: req.body.type
      }).then(dbRequest=>res.json(dbRequest))
      .catch(err=>res.json(err));
    });

    app.post("/api/donations", function(req, res) {
      db.Donation.create({
        name: req.body.name,
        description: req.body.description,
        uid: req.body.uid,
        item_categoryID: req.body.item_categoryID,
        type: req.body.type
      }).then(dbDonation=>res.json(dbDonation))
      .catch(err=>res.json(err));
    });

    app.post("/api/users", function(req, res) {
      db.User.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        donor: req.body.donor,
        name: req.body.name,
        phone: req.body.phone,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        orgId: req.body.orgId
      }).then(dbDonation=>res.json(dbDonation))
      .catch(err=>res.json(err));
    });

    app.post("/api/orgs", function(req, res) {
      console.log(req.body)
      db.Org.create({
        name: req.body.name,
        description: req.body.description,
        web: req.body.web,
        org_categoryID: req.body.org_categoryID
      }).then(dbDonation=>res.json(dbDonation))
      .catch(err=>res.json(err));
    });

}