/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('job_cart', {
    job_cart_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    job_cart_vehicle_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'vehicle_master',
        key: 'vehicle_master_id'
      }
    },
    job_cart_reason: {
      type: DataTypes.STRING,
      allowNull: true
    },
    job_cart_terms: {
      type: DataTypes.STRING,
      allowNull: true
    },
    job_cart_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'job_cart'
  });
};
