var db = require('../models')

module.exports = function(app) {

  //======================Donation Routes========================
  //=============================================================

    //GET route to return ALL Donations (need?)
    app.get("/api/donations", function(req, res) {
      db.Donation.findAll({}).then(dbDonation=>res.json(dbDonation));
    });

    // GET route for returning all Donations of a specific categoryID
    app.get("/api/donations/:item_categoryID", function(req, res) {
      db.Donation.findAll({
        where: {
          item_categoryID: req.params.item_categoryID
        }
      })
      .then(function(dbDonation) {
        res.json(dbDonation);
      });
    });


    // PUT route for updating Donation
    app.put("/api/donations", function(req, res) {
      db.Donation.update(req.body,
        {
          where: {
            id: req.body.id
          }
        })
      .then(function(dbDonation) {
        res.json(dbDonation);
      });
    });

    // DELETE route for deleting Donation
    app.delete("/api/donations/:id", function(req, res) {
      db.Donation.destroy({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbDonation) {
        res.json(dbDonation);
      });
    });

  //======================Request/Needs Routes=========================
  //===================================================================

  //GET route to return ALL requests/needs
  app.get("/api/requests", function(req, res) {
    db.Request.findAll({}).then(dbRequest=>res.json(dbRequest));
  });

  // GET route for returning Organizatiions of a specific category
  app.get("/api/requests/:item_categoryID", function(req, res) {
    db.Requets.findAll({
      where: {
        category: req.params.item_categoryID
      }
    })
    .then(function(dbRequest) {
      res.json(dbRequest);
    });
  });

  // PUT route for updating request
  app.put("/api/requests", function(req, res) {
    db.Request.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
    .then(function(dbRequest) {
      res.json(dbRequest);
    });
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
  

  // DELETE route for deleting requet
  app.delete("/api/requests/:id", function(req, res) {
    db.Request.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function(dbRequest) {
      res.json(dbRequest);
    });
  });
  

}