// var User = require('./user.js');
// // var Item = require('./item.js');
// var Category = require('./category.js');

module.exports = function(sequelize, DataTypes) {
  var Donation = sequelize.define("Donation", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
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
    categoryID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Categories',
        key: 'id'
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['material', 'service']]
      }
    },
    closed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations defined here
        models.Donation.hasMany(models.Picture);
        models.Picture.belongsTo(models.Donation);
      } 
    }
  });
  return Donation;
};