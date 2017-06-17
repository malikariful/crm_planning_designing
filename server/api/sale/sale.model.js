'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Sale', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
  });
}
