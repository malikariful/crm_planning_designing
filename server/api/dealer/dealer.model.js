'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Dealer', {
    _id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    dealer_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dealer_email: {
      type: DataTypes.STRING,
      unique: {
        msg: 'The specified email address is already in use.'
      },
      validate: {
        isEmail: true
      }
    },
    dealer_phone: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    dealer_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dealer_address: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'Dealer'
  });
}
