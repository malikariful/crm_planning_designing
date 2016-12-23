/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('hasVehicle', {
    customer_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'customer',
        key: 'customer_id'
      }
    },
    vehicle_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'vehicle',
        key: 'vehicle_id'
      }
    },
    has_vehicle: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    }
  }, {
    tableName: 'hasVehicle'
  });
};
