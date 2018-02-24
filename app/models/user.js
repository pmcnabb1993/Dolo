var Org = require('./org.js');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    donor: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: DataTypes.STRING,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: {
      type: DataTypes.STRING,
      validate: {
        len: [2]
      }
    },
    zip: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true
      }
    },
    orgId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Orgs',
        key: 'id'
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations defined here
        models.User.hasMany(models.Donation);
        models.Donation.belongsTo(models.User);
        models.User.hasMany(models.Request);
        models.Request.belongsTo(models.User);
      } 
    }
  });
};