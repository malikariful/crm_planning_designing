'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Role', {
    role_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    role_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'Role'
  });
}
