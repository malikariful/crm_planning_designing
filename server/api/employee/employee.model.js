'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Employee', {
    _id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    employee_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'Employee'
  });
}
