module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define("Category", {
    desc: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return Category;
};