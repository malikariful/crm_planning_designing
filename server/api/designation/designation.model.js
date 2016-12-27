'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Designation', {
    designation_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    designation_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    designation_descriptions: {
      type: DataTypes.STRING,
      allowNull: true
    },
    designation_lavel: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'Designation'
  });
}
