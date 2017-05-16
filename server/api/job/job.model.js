'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Job', {
    _id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    job_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    job_reason: {
      type: DataTypes.STRING,
      allowNull: true
    },
    job_terms: {
      type: DataTypes.STRING,
      allowNull: true
    },
    job_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'Job'
  });
}
