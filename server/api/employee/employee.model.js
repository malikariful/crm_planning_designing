'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Employees_master', {
    employee_master_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    employee_master_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    employee_master_designation_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'Designation',
        key: 'designation_id'
      }
    }
  }, {
    tableName: 'Employees_master'
  });
}
