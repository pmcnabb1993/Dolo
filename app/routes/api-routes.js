var db = require('../models')

module.exports = function(app) {

  //======================Donation Routes========================
  //=============================================================

    //GET route to return ALL Donations (need?)
    app.get("/api/donations", function(req, res) {
      db.Donation.findAll({}).then(data=>res.json(dbItem));
    });

    // GET route for returning all Donations of a specific categoryID
    app.get("/api/donations/category/:item_categoryID", function(req, res) {
      db.Donation.findAll({
        where: {
          categoryID: req.params.item_categoryID
        }
      })
      .then(function(dbItem) {
        res.json(dbItem);
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
      .then(function(dbItem) {
        res.json(dbItem);
      });
    });

    // DELETE route for deleting Donation
    app.delete("/api/donations/:id", function(req, res) {
      db.Donation.destroy({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbItem) {
        res.json(dbItem);
      });
    });

  //======================Request/Needs Routes=========================
  //===================================================================

  //GET route to return ALL requests/needs
  app.get("/api/requests", function(req, res) {
    db.Request.findAll({}).then(data=>res.json(data));
  });

  // GET route for returning Organizatiions of a specific category
  app.get("/api/requests/:item_categoryID", function(req, res) {
    db.Requets.findAll({
      where: {
        category: req.params.item_categoryID
      }
    })
    .then(function(dbItem) {
      res.json(dbItem);
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
    .then(function(dbItem) {
      res.json(dbItem);
    });
  });

  // DELETE route for deleting requet
  app.delete("/api/requests/:id", function(req, res) {
    db.Request.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function(dbItem) {
      res.json(dbItem);
    });
  });
  

};