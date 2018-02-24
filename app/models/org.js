module.exports = function(sequelize, DataTypes) {
  var Org = sequelize.define("Org", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    web: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true, 
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
      models.Org.hasMany(models.User);
      models.User.belongsTo(models.Org);
    } 
  }
});
  return Org;
};


