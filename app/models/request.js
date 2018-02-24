// var User = require('./user.js');
// // var Item = require('./item.js');
// var Category = require('./category.js');

module.exports = function(sequelize, DataTypes) {
  var Request = sequelize.define("Request", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
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
  });
  // , {
  //   classMethods: {
  //     associate: function(models) {
  //       // associations defined here
  //       models.Request.hasMany(models.item);
  //       models.item.belongsTo(models.Request);
  //     }
  //   } 
  // });
  return Request;
};