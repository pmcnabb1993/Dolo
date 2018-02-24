var Item = require('./item.js');

module.exports = function(sequelize, DataTypes) {
  var Pictures = sequelize.define("Pictures", {
    source: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    itemID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Items',
        key: 'id'
      }
    }
  });
  return Pictures;
};