'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Area', {
    area_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    area_name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    area_address: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'Area'
  });
}
