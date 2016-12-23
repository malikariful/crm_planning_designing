/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vehicle_master', {
    vehicle_master_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    vehicle_master_chassis_no: {
      type: DataTypes.STRING,
      allowNull: false
    },
    vehicle_master_engine_no: {
      type: DataTypes.STRING,
      allowNull: false
    },
    vehicle_master_model_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'vehicle_model',
        key: 'vehicle_model_id'
      }
    }
  }, {
    tableName: 'vehicle_master'
  });
};
