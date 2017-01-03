'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Dealer', {
    dealer_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    dealer_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dealer_address: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'Dealer'
  });
}
