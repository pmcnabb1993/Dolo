module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define("Category", {
    name: {
      type: DataTypes.STRING, 
      unique: true,
      allowNull: false
    } 
  }, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
  });
  return Category;
};