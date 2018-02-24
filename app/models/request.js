var User = require('./user.js');
var Item = require('./item.js');

module.exports = function(sequelize, DataTypes) {
  var Request = sequelize.define("Request", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    closed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
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
        models.Request.hasMany(models.item);
        models.item.belongsTo(models.Request);
      }
    } 
  });
  return Request;
};