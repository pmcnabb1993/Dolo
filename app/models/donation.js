var User = require('./user.js');
var Item = require('./item.js');

module.exports = function(sequelize, DataTypes) {
  var Donation = sequelize.define("Donation", {
    desc: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    uid: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    itemID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Items',
        key: 'id'
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations defined here
        models.Donation.hasMany(models.item);
        models.item.belongsTo(models.Donation);
      } 
    }
  });
  return Donation;
};