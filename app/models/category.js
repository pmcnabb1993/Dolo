module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define("Category", {
    type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Category;
};