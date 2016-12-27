/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vehicle_model', {
    vehicle_model_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    vehicle_model_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'vehicle_model'
  });
};
