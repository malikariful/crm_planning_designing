'use strict';

export default function (sequelize, DataTypes) {
  return sequelize.define('Customer', {
    _id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    customer_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    free_service_number: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    customer_area_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'Area',
        key: 'area_id'
      }
    }
  }, {
    tableName: 'Customer'
  });
}
