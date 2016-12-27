'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Permission', {
    permission_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    permisson_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'Permission'
  });
}
