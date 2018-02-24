var Category = require('./category.js');

module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define("Item", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['material', 'service']]
      }
    },
    categoryID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Categories',
        key: 'id'
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations defined here
        models.Item.hasMany(models.Picture);
        models.Picture.belongsTo(models.Item);
      } 
    }
  });
  return Item;
};

